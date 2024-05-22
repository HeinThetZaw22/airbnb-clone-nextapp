"use client";
import {BiSearch} from 'react-icons/bi';
const Search = () => {
  return (
    <div
      className=" w-full md:w-auto rounded-full
     border-[1px] py-2 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex flex-row items-center justify-between">
        <div className=" text-sm font-semibold px-6">Anywhere</div>
        <div className=" text-sm font-semibold hidden sm:block border-x-[1px] px-6">
          AnyWeek
        </div>
        <div className="flex flex-row items-center gap-3 text-sm pl-6 pr-2">
            <div className="">Add Guests</div>
            <div className=' bg-rose-500 p-2 rounded-full'>
                <BiSearch />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
