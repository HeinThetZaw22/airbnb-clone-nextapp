import getCurrentUser from '../action/getCurrentUser'
import getReservationWithListing from '../action/getReservationWithListing';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState'
import ReservationClient from '../reservations/ReservationClient'

export const dynamic = 'force-dynamic';

const ReservationPage = async () => {

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
          
                <EmptyState title='Unauthorized'
                    subtitle='Please login' />
          
        )
    }

    const reservations = await getReservationWithListing({
        authorId: currentUser.id
    })

    if (reservations.length === 0) {
        return (
         
                <EmptyState title='No reservations found'
                    subtitle="Looks like you have no reservations on your propeties " />
          
        )
    }

    // Convert reservations to plain objects
    const plainReservations = reservations.map(reservation => ({
        ...reservation.toObject(),
        listing: reservation.listingId.toObject(),
        listingId: reservation.listingId._id.toString(),
    }));

    return (
        
            <ReservationClient reservations={plainReservations}
            currentUser={currentUser} />
      
    )
}

export default ReservationPage