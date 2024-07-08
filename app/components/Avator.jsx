"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from 'react'

const Avatar = ({ currentUser }) => {
  // console.log(currentUser);
  const {data: session } = useSession();
  // console.log(session?.user?.image);
  const firstLetter = currentUser?.email?.charAt(0).toUpperCase();

  return (
    <div>
      {currentUser ? (
        session?.user?.image ? (
          <Image 
            alt="profile" 
            className="rounded-full" 
            width="30" 
            height="30" 
            src={session?.user?.image}
          />
        ) : (
          <p className="bg-neutral-400 px-2 py-1 rounded-full">{firstLetter}</p>
        )
      ) : (
        <Image 
          alt="profile" 
          className="rounded-full" 
          width="30" 
          height="30" 
          src={"/images/placeholder.jpg"} 
        />
      )}
    </div>
  )
}

export default Avatar;
