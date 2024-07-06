"use client";
const Button = ({ label, onClick, disabled, Icon, small, outline }) => {
  return (
    <button
      onClick={onClick}
      className={`relative mt-3 w-full hover:opacity-70 rounded-lg disabled:opacity-70
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
      {Icon && <Icon size="24" className="absolute top-3 left-4" />}
      {label}
    </button>
  );
};

export default Button;
