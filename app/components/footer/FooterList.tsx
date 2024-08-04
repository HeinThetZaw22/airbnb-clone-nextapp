"use client";
interface FooterListProps {
  label: string;
}
const FooterList = ({label}) => {
  return (
    <div className=" cursor-pointer hover:underline">
        <p className=" text-sm text-neutral-500 mt-2">{label}</p>
    </div>
  )
}

export default FooterList