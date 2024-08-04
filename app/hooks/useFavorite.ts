import { useRouter } from "next/navigation";
import useLoginModel from './useLoginModal';
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import { SafeUser } from "../types";


interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}
const useFavorite = ({
  listingId,
  currentUser
}: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModel();

  // const [hasFavorited, setHasFavorited] = useState(() => {
  //   const list = currentUser?.favoriteIds || [];
  //   return list.includes(listingId);
  // });

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // console.log(hasFavorited);
    try {
      let request: () => Promise<AxiosResponse<any>>;
      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`)
      }

      await request();
      // setHasFavorited(!hasFavorited);
      router.refresh();
      toast.success(hasFavorited ? "Removed from Favorites" : "Added to Favorites");

    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }, [
    listingId, 
    loginModal, 
    hasFavorited, 
    currentUser, 
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite