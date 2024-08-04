"use client";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { SafeReservations, SafeUser } from "../types";
import axios from "axios";

interface ReservationClientProps {
  reservations: SafeReservations[];
  currentUser?: SafeUser | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback( (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    }, [router]);

  return (
    <Container>
      <Heading 
      title="Reservations" 
      subtitle="Bookings on your properties" />
      <div className=" 
      pt-10 grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      xl:grid-cols-5 
      2xl:grid-cols-6 gap-8
      ">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              currentUser={currentUser}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest reservation"
              actionId={reservation.id}
              onAction={onCancel}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationClient;
