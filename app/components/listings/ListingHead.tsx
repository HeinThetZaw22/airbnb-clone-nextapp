
import Image from "next/image";
import useCountries from "../../hooks/useCountry";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { SafeUser } from "@/app/types";

interface ListingHeadProps {
  id: string;
  title: string;
  locationValue: string;
  imageSrc: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  title,
  locationValue,
  imageSrc,
  currentUser
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  // console.log(id);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`} />
      <div className="
           relative 
           w-full 
           h-[60vh] 
           overflow-hidden 
           rounded-xl
           ">
            <img src={imageSrc} alt='detail image' className="w-full object-cover" alt="" />
        {/* <Image
          src={imageSrc}
          fill
          alt="detail image"
          className=" w-full object-cover"
        /> */}
        <div className="absolute top-5 right-5">
          <HeartButton
            listingId={id}
            currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead