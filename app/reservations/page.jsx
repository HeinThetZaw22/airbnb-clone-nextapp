import getCurrentUser from '../action/getCurrentUser'
import getReservationWithListing from '../action/getReservationWithListing';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState'
import ReservationClient from '../reservations/ReservationClient'
const ReservationPage = async () => {

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title='Unauthorized'
                    subtitle='Please login' />
            </ClientOnly>
        )
    }

    const reservations = await getReservationWithListing({
        authorId: currentUser.id
    })

    // console.log("get my reservation",reservations);
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No reservations found'
                    subtitle="Looks like you have no reservations on your propeties " />
            </ClientOnly>
        )
    }


    // Convert reservations to plain objects
    const plainReservations = reservations.map(reservation => ({
        ...reservation.toObject(),
        listing: reservation.listingId.toObject(),
        listingId: reservation.listingId._id.toString(),
    }));

    // console.log("plainReservation", plainReservations);

    return (
        <ClientOnly>
            <ReservationClient reservations={plainReservations}
            currentUser={currentUser} />
        </ClientOnly>
    )
}

export default ReservationPage