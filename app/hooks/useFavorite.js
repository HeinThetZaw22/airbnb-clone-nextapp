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

  // useEffect(() => {
  //   setHasFavorited(currentUser?.favoriteIds.includes(listingId));
  // }, [currentUser, listingId]);

  // const hasFavorited = useMemo(() => {
  //     const list = currentUser?.favoriteIds || [];
  //     return list.includes(listingId);
  //     //return true if found in array
  // }, [listingId, currentUser]);

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
      const data = await res.json();
      if (res.ok) {
        setHasFavorited(!hasFavorited);
        router.refresh();
        toast.success(hasFavorited ? "Removed from Favorites": "Added to Favorites");
        console.log("updated data", data.user.favoriteIds);
      } else {
        toast.error(data.error || "Something went wrong");
      }

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