import getCurrentUser from "../../action/getCurrentUser";
import getDetailListing from "../../action/getDetailListing";
import getReservation from "../../action/getReservation";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId: string;
}

const page = async ({ params }: { params: IParams }) => {
  const listing = await getDetailListing(params);
  const reservations = await getReservation(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default page;
