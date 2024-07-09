import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getFavoriteListings from '../action/getFavoriteListings';
import FavoriteClient from '../favorites/FavoriteClient'
import getCurrentUser from '../action/getCurrentUser';
export const dynamic = 'force-dynamic';

const page = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();
  // console.log("fav listings", listings);
  if(listings.length === 0){
    return (
      
          <EmptyState title='No favorites found'
          subtitle='Looks like you have no favorite listings' />
      
    )
  }
  return (
    
      <FavoriteClient listings={listings} currentUser={currentUser} />
    
  )
  
}

export default page