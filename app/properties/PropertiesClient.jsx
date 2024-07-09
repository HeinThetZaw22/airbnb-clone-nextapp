"use client";
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

const PropertiesClient = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback( async (id) => {
    setDeletingId(id);

    try {
      const res = await fetch(`/api/listings/${id}`,{
        method: 'DELETE',
      })
      if(res.ok){
        toast.success("Listing deleted");
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
      title="Properties"
      subtitle="Lists of your properties" />
      <div className=" pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map(listing => {
          return (
            <ListingCard
              key={listing._id}
              data={listing}
              currentUser={currentUser}
              disabled={deletingId === listing._id}
              actionLabel="Delete Property"
              actionId={listing._id}
              onAction={onCancel}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
