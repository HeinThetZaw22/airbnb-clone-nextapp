"use client";
import Image from "next/image";
import React from 'react';
import { SafeUser } from "../types";

interface AvatorProps {
  src?: string;
}
const Avatar: React.FC<AvatorProps> = ({
  src
}) => {
  // const firstLetter = src?.email?.charAt(0).toUpperCase();

  return (
    <div>
      {src ? (
        <Image
          alt="profile"
          className="rounded-full"
          width="30"
          height="30"
          src={src}
        />
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
