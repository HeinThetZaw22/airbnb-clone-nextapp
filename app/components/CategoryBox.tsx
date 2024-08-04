"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = () => {
    let currentQuery = {};

    //look for current param
    if (params) {
      //to get object with params
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    };
    //toggle select and remove
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    //generate url
    const url = qs.stringifyUrl({
        url: "/",
        query: updatedQuery,
      }, { skipNull: true });
      
    router.push(url);
  };

  return (
    <div
      onClick={handleClick}
      className={`
      flex flex-col gap-2 
      hover:text-neutral-800
      transition 
      cursor-pointer 
      justify-between
      items-center p-2 border-b-2
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}>
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
