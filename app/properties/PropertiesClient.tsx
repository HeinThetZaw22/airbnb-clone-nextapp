"use client";
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { SafeListings, SafeUser } from '../types';

interface PropertiesClientProps {
  listings: SafeListings[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ 
  listings, 
  currentUser 
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback( async (id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success("Listing deleted")
      router.refresh()
    })
    .catch(() => {
      toast.error("Something went wrong")
    })
    .finally(() => {
      setDeletingId("");
    })

  },[router]);

  return (
    <Container>
      <Heading
      title="Properties"
      subtitle="Lists of your properties" />
      <div className=" pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map(listing => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
              disabled={deletingId === listing.id}
              actionLabel="Delete Property"
              actionId={listing.id}
              onAction={onCancel}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
