import getCurrentUser from "../action/getCurrentUser";
import getReservation from "../action/getReservation";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
        title="Unauthorized" 
        subtitle="Please login" 
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservation({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any  trips "
      />
    );
  }

  return (
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
    ></TripsClient>
  );
};

export default TripPage;
