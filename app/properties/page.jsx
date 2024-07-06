import getCurrentUser from '../action/getCurrentUser';
import  getProperties from '../action/getProperties';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState'
import PropertiesClient from './PropertiesClient';
const PropertyPage = async () => {
    const currentUser = await getCurrentUser();


    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title='Unauthorized'
                subtitle='Please login' />
            </ClientOnly>
        )
    }

    const listings = await getProperties({ userId: currentUser.id });

    if(listings.length === 0){
        return (
            <ClientOnly>
                <EmptyState title='No trips found'
                subtitle="Looks like you haven't reserved any  trips " />
            </ClientOnly>
        )
    }

    //   const plainListings = listings.map(listing => ({
    //     ...listing.toObject(),
    //     listing: listing.listingId.toObject(),
    //     listingId: reservation.listingId._id.toString(),
    // }));

  return (
    <ClientOnly>
        <PropertiesClient 
        listings={listings}
        currentUser={currentUser}>
        </PropertiesClient>
    </ClientOnly>
  )
}

export default PropertyPage