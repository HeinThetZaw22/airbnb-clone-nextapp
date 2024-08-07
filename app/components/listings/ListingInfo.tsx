import dynamic from "next/dynamic";
import useCountries from "../../hooks/useCountry";
import Avator from "../Avator";
import ListingCategory from "./ListingCategory";
import { useMemo } from "react";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  const coordinate = location?.latlng;
  // console.log(coordinate)

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    []
  );

  return (
    <div
      className=" 
        flex 
        flex-col 
        gap-8"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row text-xl gap-2 font-semibold items-center">
          <div>
            {location.region}, {location.label}
          </div>
        </div>
        <div className=" flex flex-row items-center  gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div className=" border-x-[1px] px-3">{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      <div className="flex flex-row items-center gap-4">
        <div>
          <Avator src={user?.image} />
        </div>
        <div className="flex flex-col gap-2 font-light">
          <div>
            Hosted by <span className=" font-semibold">{user?.name}</span>
          </div>
        </div>
      </div>
      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinate} />
    </div>
  );
};

export default ListingInfo;
