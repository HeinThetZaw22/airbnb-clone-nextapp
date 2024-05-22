"use client";
import React from 'react'

const MenuItem = ({label, onClick}) => {
  return (
    <div
    onClick={onClick}
     className=' px-4 py-3 transition hover:bg-neutral-100 cursor-pointer'>
        {label}
    </div>
  )
}

export default MenuItem