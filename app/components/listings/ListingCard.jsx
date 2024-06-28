"use client";
import { useRouter } from "next/navigation"
import useCountries from "../../hooks/useCountry";
import HeartButton from '../HeartButton';
import { useCallback, useMemo } from "react";
import {format} from 'data-fns';

const ListingCard = ({ data, currentUser, reservation, actionLabel, actionId, onAction, disabled }) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.location.value);
  // console.log(location);
  // console.log(data);

  const handleCancel = useCallback((e) => {
    e.stopPropagation();
    if(disabled){
      return;
    }
    onAction?.(actionId)
  },[disabled, onAction, actionId])

  const price = useMemo(() => {
    if(reservation){
      return reservation.totalPrice;
    }
    return data.price;
  },[reservation, data.price])

  const reservationDate = useMemo(() => {
    if(!reservation){
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  },[reservation])

  return (
    <div onClick={() => router.push(`/listings/${data.id}`)}
      className=" col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-1 w-full">
        <div className=" aspect-square rounded-xl relative w-full overflow-hidden">
          <img src={data.imageSrc} alt="card" className=" object-cover w-full h-full transition group-hover:scale-110" />
          <div className="absolute top-3 right-3">
            <HeartButton />
          </div>
        </div>
        <div className=" font-semibold text-lg">{location?.region}, {location?.label}</div>
        <div className=" font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="font-semibold">
          $ {price}
        </div>
      </div>
    </div>

  )
}

export default ListingCard