import getCurrentUser from '../action/getCurrentUser';
import getReservation from '../action/getReservation';
import getReservationWithListing from '../action/getReservationWithListing'
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState'
import TripsClient from './TripsClient';
export const dynamic = 'force-dynamic';

const TripPage = async () => {
    const currentUser = await getCurrentUser();


    if(!currentUser){
        return (
            
                <EmptyState title='Unauthorized'
                subtitle='Please login' />
      
        )
    }

    const reservations = await getReservationWithListing({ userId: currentUser.id });
    // console.log("reservations in page", reservations);
    // console.log(currentUser);

    if(reservations.length === 0){
        return (
           
                <EmptyState title='No trips found'
                subtitle="Looks like you haven't reserved any  trips " />
           
        )
    }

      // Convert reservations to plain objects
      const plainReservations = reservations.map(reservation => ({
        ...reservation.toObject(),
        listing: reservation.listingId.toObject(),
        listingId: reservation.listingId._id.toString(),
    }));

  return (
   
        <TripsClient 
        reservations={plainReservations}
        currentUser={currentUser}>
        </TripsClient>
  
  )
}

export default TripPage