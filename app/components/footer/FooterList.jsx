"use client";

const FooterList = ({label, onClick}) => {
  return (
    <div onClick={onClick} className=" cursor-pointer hover:underline">
        <p className="font-light tracking-tighter text-sm text-neutral-500 mt-2">{label}</p>
    </div>
  )
}

export default FooterList