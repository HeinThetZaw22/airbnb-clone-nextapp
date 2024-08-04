"use client";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { SafeReservations, SafeUser } from "../types";
import axios from "axios";

interface TripsClientProps {
  reservations: SafeReservations[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string) => {
      setDeletingId(id);

      axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled")
      })
      .catch(() => {
        toast.error("Something went wrong")
      })
      .finally(() => {
        setDeletingId("")
      })
    }, []);

  return (
    <Container>
      <Heading title="Your Trips" subtitle="Places that you have reserved" />
      <div className=" pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              currentUser={currentUser}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              actionId={reservation.id}
              onAction={onCancel}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
