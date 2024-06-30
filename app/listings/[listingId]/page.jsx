import getCurrentUser from '../../action/getCurrentUser';
import getDetailListing from '../../action/getDetailListing';
import ClientOnly from '../../components/ClientOnly';
import Container from '../../components/Container';
import EmptyState from '../../components/EmptyState';
import ListingClient from './ListingClient'

const page = async ({ params }) => {
  //  console.log({params});
  const { listingId } = params;
  //  console.log(listingId);
  const listing = await getDetailListing(listingId);
  const currentUser = await getCurrentUser();

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
        currentUser={currentUser} />
     
    </ClientOnly>

  )
}

export default page