import getCurrentUser from "../action/getCurrentUser";
import getListings from "../action/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertyPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties found"
          subtitle="Looks like you haven't airbnb your property "
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient 
      listings={listings} 
      currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertyPage;
