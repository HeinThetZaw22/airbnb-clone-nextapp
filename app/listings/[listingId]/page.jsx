import getCurrentUser from '../../action/getCurrentUser';
import getDetailListing from '../../action/getDetailListing';
import getReservation from '../../action/getReservation'
import ClientOnly from '../../components/ClientOnly';
import EmptyState from '../../components/EmptyState';
import ListingClient from './ListingClient'

const page = async ({ params }) => {
  //  console.log({params});
  const { listingId } = params;
  //  console.log(listingId);
  const reservations = await getReservation(params);
  const listing = await getDetailListing(listingId);
  const currentUser = await getCurrentUser();

  // console.log(reservations);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
        <ListingClient 
        listing={listing} 
        currentUser={currentUser}
        reservations={reservations} />
    </ClientOnly>
  )
}

export default page