import React from "react";

const Button = ({ label, onClick, disabled, icon, small, outline }) => {
  return (
    <button
      className={`relative w-full hover:opacity-70 rounded-lg disabled:opacity-70
      transition disabled:cursor-not-allowed
      ${outline ? "bg-white" : " bg-rose-500"}
      ${outline ? " border-black" : " border-rose-500"}
      ${outline ? "text-black" : " text-white"}
      ${small ? "py-1" : "py-3"}
      ${small ? "font-light" : " font-semibold"}
      ${small ? " text-sm" : " text-md"}
      ${small ? " border-[1px]" : "border-2"}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
