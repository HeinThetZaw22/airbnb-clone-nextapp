"use client";
import Image from "next/image";
import React from 'react'

const Avator =  ({currentUser}) => {
  const firstLetter = currentUser?.email?.charAt(0).toUpperCase();

  return (
    <div>
         {currentUser ? (<p className=" bg-neutral-400 px-2 py-1 rounded-full">{firstLetter}</p>) : (<Image alt="profile" className="rounded-full" width="30" 
      height="30" src={"/images/placeholder.jpg"} /> )}
    </div>
   
    
  )
}

export default Avator