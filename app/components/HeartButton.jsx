"use client";
import useFavorite from '../hooks/useFavorite';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const HeartButton = ({listingId, currentUser}) => {
  // console.log(listingId, currentUser)
  const { hasFavorited, toggleFavorite} = useFavorite({listingId, currentUser});
 
  // console.log(hasFavorited);
  return (
    <div onClick={toggleFavorite} 
    className=" relative cursor-pointer hover:opacity-80">
        <AiOutlineHeart size={28} className=" absolute -top-[2px] -right-[2px] fill-white" />
        <AiFillHeart size={24} className={
            hasFavorited ? 'fill-rose-500' : "fill-neutral-500/70"
        } />
    </div>
  )
}

export default HeartButton