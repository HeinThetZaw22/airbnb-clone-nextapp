import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getFavoriteListings from '../action/getFavoriteListings';
import FavoriteClient from '../favorites/FavoriteClient'
import getCurrentUser from '../action/getCurrentUser';
const page = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();
  // console.log("fav listings", listings);
  if(listings.length === 0){
    return (
      <ClientOnly>
          <EmptyState title='No favorites found'
          subtitle='Looks like you have no favorite listings' />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <FavoriteClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
  
}

export default page