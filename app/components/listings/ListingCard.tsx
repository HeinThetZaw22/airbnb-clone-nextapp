"use client";
import { useRouter } from "next/navigation"
import useCountries from "../../hooks/useCountry";
import HeartButton from '../HeartButton';
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Button from "../Button";
import Image from "next/image";
import { Listing, Reservation } from "@prisma/client";
import { SafeListings, SafeReservations, SafeUser } from "@/app/types";

interface ListingCardProps {
  data: SafeListings;
  currentUser?: SafeUser | null;
  reservation?: SafeReservations;
  actionLabel?: string;
  actionId?: string;
  onAction?: (id: string) => void;
  disabled?: boolean;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  reservation,
  actionLabel,
  actionId,
  onAction,
  disabled
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  // console.log(location);
  console.log(data.imageSrc);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId])

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation])

  return (
    <div onClick={() => router.push(`/listings/${data.id}`)}
      className=" col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-1 w-full">
        <div className="
             relative
             aspect-square 
             rounded-xl  
             w-full 
             overflow-hidden
             ">
             <img className=" 
            object-cover 
            w-full h-full 
            transition 
            group-hover:scale-110
            " src={data.imageSrc} alt="" />
          {/* <Image
            src={data.imageSrc}
            fill
            alt="listing card"
            className=" 
            object-cover 
            w-full h-full 
            transition 
            group-hover:scale-110
            "/> */}
          <div className="
               absolute 
               top-3 
               right-3
               ">
              <HeartButton
                listingId={data.id}
                currentUser={currentUser} 
              />
          </div>
        </div>
        <div className=" font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className=" font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row gap-2 item-center">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">per night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            small
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel} />
        )}
      </div>
    </div>
  )
}

export default ListingCard