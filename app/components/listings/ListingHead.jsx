'use client';

import Image from "next/image";
import useCountries from "../../hooks/useCountry";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

const ListingHead = ({title, id, locationValue, imageSrc, currentUser}) => {
  const {getByValue} = useCountries();
  const location = getByValue(locationValue);
  // console.log(id);
  return (
    <>
     <Heading title={title}
     subtitle={`${location?.region}, ${location?.label}`} />
     <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
      <Image src={imageSrc} fill alt="detail image" className=" w-full object-cover" />
      <div className=" absolute  top-5 right-5">
      <HeartButton listingId={id} currentUser={currentUser} />
     </div>
     </div>
    
    </>
  )
}

export default ListingHead