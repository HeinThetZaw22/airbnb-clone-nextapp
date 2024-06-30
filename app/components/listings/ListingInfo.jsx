import useCountries from "../../hooks/useCountry"
import Avator from "../Avator";

const ListingInfo = ({
    currentUser,
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue
}) => {
    // console.log(currentUser);
    const {getByValue} = useCountries();
    const location = getByValue(locationValue);
    // console.log(location)
    return (
        <div className=" flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row text-xl gap-2 font-semibold items-center">
                    <div>{location.region}, {location.label}</div>
                </div>
                <div className=" flex flex-row items-center  gap-4 font-light text-neutral-500">
                    <div>{guestCount} guests</div>
                    <div className=" border-x-[1px] px-3">{roomCount} rooms</div>
                    <div>{bathroomCount} bathrooms</div>
                </div>
            </div>
            <hr />
            <div className="flex flex-row items-center gap-4">
                <div><Avator /></div>
                <div className="flex flex-col gap-2 font-light">
                    <div>Hosted by {user?.name}</div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default ListingInfo