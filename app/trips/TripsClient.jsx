"use client";
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

const TripsClient = ({ reservations, currentUser }) => {
  // console.log(reservations);
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback( async (id) => {
    setDeletingId(id);

    try {
      const res = await fetch(`/api/reservations/${id}`,{
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        }
      })
      if(res.ok){
        toast.success("Reservation cancelled");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error)
    } finally {
      setDeletingId('');
    }
  },[router])


  return (
    <Container>
      <Heading
      title="Your Trips"
      subtitle="Where you've been and where you're going" />
      <div className=" pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map(reservation => {
          return (
            <ListingCard
              key={reservation._id}
              data={reservation.listing}
              reservation={reservation}
              currentUser={currentUser}
              disabled={deletingId === reservation._id}
              actionLabel="Cancel reservation"
              actionId={reservation._id}
              onAction={onCancel}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
