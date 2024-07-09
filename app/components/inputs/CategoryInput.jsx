"use client";
const CategoryInput = ({ selected, icon: Icon, onClick, label }) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={` rounded-xl p-2 border-2 hover:border-black flex flex-col gap-3 transition cursor-pointer
      ${selected ? "border-black" : "border-neutral-200"} `}
    >
      <Icon size={30} />
      <div className=" font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
