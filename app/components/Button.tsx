"use client";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
  small?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  small,
  outline }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      relative 
      mt-3 
      w-full 
      hover:opacity-70 
      rounded-lg 
      disabled:opacity-70
      transition 
      disabled:cursor-not-allowed
      ${outline ? "bg-white" : " bg-rose-500"}
      ${outline ? " border-black" : " border-rose-500"}
      ${outline ? "text-black" : " text-white"}
      ${small ? "py-1" : "py-3"}
      ${small ? "font-light" : " font-semibold"}
      ${small ? " text-sm" : " text-md"}
      ${small ? " border-[1px]" : "border-2"}
      `}
    >
      {Icon && (
        <Icon size="24" className="absolute top-3 left-4" />
      )}
      {label}
    </button>
  );
};

export default Button;
