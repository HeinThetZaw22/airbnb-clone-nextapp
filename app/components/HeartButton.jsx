"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const HeartButton = () => {
    const hasFavorite = false;
    const toggleFavorite = () => {};
  return (
    <div onClick={toggleFavorite} 
    className=" relative cursor-pointer hover:opacity-80">
        <AiOutlineHeart size={28} className=" absolute -top-[2px] -right-[2px] fill-white" />
        <AiFillHeart size={24} className={
            hasFavorite ? 'fill-rose-500' : "fill-neutral-500/70"
        } />
    </div>
  )
}

export default HeartButton