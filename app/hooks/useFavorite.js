import { useRouter } from "next/navigation";
import useLoginModel from './useLoginModal';
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
const useFavorite = ({ listingId, currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModel();

  const [hasFavorited, setHasFavorited] = useState(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  });

  // const hasFavorited = useMemo(() => {
  //   const list = currentUser?.favoriteIds || [];
  //   return list.includes(listingId);
  // })

  const toggleFavorite = useCallback(async (e) => {
    e.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // console.log(hasFavorited);

    try {
      let request;
      if (hasFavorited) {
        request = async () => await fetch(`/api/favorites/${listingId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        })

      } else {
        request = async () => await fetch(`/api/favorites/${listingId}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        })
      }
      
      const res = await request();
      // const data = await res.json();
      if (!res.ok) {
         throw new Error("Failed to update favorite status")
      } 
      setHasFavorited(!hasFavorited);
        router.refresh();
        toast.success(hasFavorited ? "Removed from Favorites": "Added to Favorites");
        // console.log("updated data", data.user.favoriteIds);

    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }, [listingId, loginModal, hasFavorited, currentUser, router])

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite