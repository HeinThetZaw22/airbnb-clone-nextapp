"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  onClick
}) => {
  return (
    <div
    onClick={onClick}
     className=' px-4 py-3 transition hover:bg-neutral-100 cursor-pointer'>
        {label}
    </div>
  )
}

export default MenuItem