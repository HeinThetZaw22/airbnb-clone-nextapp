"use client";
import { categories } from "../../components/navbar/Categories"
import ListingHead from '../../components/listings/ListingHead'
import { useMemo } from "react";
import Container from "../../components/Container";
import ListingInfo from '../../components/listings/ListingInfo'
import ListingCategory from '../../components/listings/ListingCategory'
const ListingClient = ({ listing, currentUser, reservations }) => {
    // console.log(listing);
    const category = useMemo(() => {
        return categories.find(item => item.label === listing.category);
    }, [listing.category])
    // console.log(listing?.user);
    return (
        <Container>
            <div className=" max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        id={listing._id}
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.location.value}
                        currentUser={currentUser}
                    />
                   <div className=" grid grid-cols-3">
                    <div className=" col-span-3 md:col-span-2">
                    <ListingInfo
                    user={listing.user}
                    currentUser={currentUser}
                    category={category}
                    description={listing.description}
                    roomCount={listing.roomCount}
                    guestCount={listing.guestCount}
                    bathroomCount={listing.bathroomCount}
                    locationValue={listing.location.value} />
                    
                    </div>
                   </div>
                   <div className=" grid grid-cols-3">
                   <div className=" col-span-3 md:col-span-2">
                   {category && (
                    <ListingCategory icon={category.icon}
                    label={category.label}
                    description={category.description} />
                   )}
                   </div>
                   </div>
                </div>
            </div>
        </Container>

    )
}

export default ListingClient