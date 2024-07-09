"use client";
import {BiSearch} from 'react-icons/bi';
import useSearchModal from '../../hooks/useSearchModal'
import { useSearchParams } from 'next/navigation';
import useCountries from '../../hooks/useCountry';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const {getByValue} = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if(locationValue) {
      return getByValue(locationValue)?.label;
    }
    return 'Anywhere'
  },[locationValue, getByValue])

  const durationLabel = useMemo(() => {
      if(startDate && endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)
        let diff = differenceInDays(end, start);

        if(diff === 0) {
          diff = 1;
        }
        return `${diff} Days`
      }
      return 'Add Weeks'
  },[startDate, endDate])

  const guestLabel = useMemo(() => {
    if(guestCount) {
      return `${guestCount} Guests`
    }

    return 'Add Guests'
  }, [guestCount])

  return (
    <div
    onClick={searchModal.onOpen}
      className=" w-full md:w-auto rounded-full
     border-[1px] py-2 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex flex-row items-center justify-between">
        <div className=" text-sm font-semibold px-6">{locationLabel}</div>
        <div className=" text-sm font-semibold hidden sm:block border-x-[1px] px-6">
          {durationLabel}
        </div>
        <div className="flex flex-row items-center gap-3 text-sm pl-6 pr-2">
            <div className="">{guestLabel}</div>
            <div className=' bg-rose-500 p-2 rounded-full'>
                <BiSearch />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
