import getCurrentUser from '../action/getCurrentUser';
import  getProperties from '../action/getProperties';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState'
import PropertiesClient from './PropertiesClient';
export const dynamic = 'force-dynamic';

const PropertyPage = async () => {
    const currentUser = await getCurrentUser();


    if(!currentUser){
        return (
            
                <EmptyState title='Unauthorized'
                subtitle='Please login' />
            
        )
    }

    const listings = await getProperties({ userId: currentUser.id });

    if(listings.length === 0){
        return (
            
                <EmptyState title='No Properties found'
                subtitle="Looks like you haven't airbnb your property " />

        )
    }

    //   const plainListings = listings.map(listing => ({
    //     ...listing.toObject(),
    //     listing: listing.listingId.toObject(),
    //     listingId: reservation.listingId._id.toString(),
    // }));

  return (
   
        <PropertiesClient 
        listings={listings}
        currentUser={currentUser}>
        </PropertiesClient>
    
  )
}

export default PropertyPage