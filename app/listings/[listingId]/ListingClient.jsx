"use client";
import { categories } from "../../components/navbar/Categories"
import ListingHead from '../../components/listings/ListingHead'
import { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../../components/Container";
import ListingInfo from '../../components/listings/ListingInfo';
import useLoginModal from "../../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import ListingReservation from "../../components/listings/ListingReservation";
import toast from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

const ListingClient = ({ listing, currentUser, reservations = [] }) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            })
            dates = [...dates, ...range];
        })
        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    const onCreateReservation = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        try {
            const res = await fetch("/api/reservations", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    totalPrice,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    listingId: listing?._id,
                }),
            });
            if (res.ok) {
                // console.log(res);
                toast.success("Reservation success");
                setDateRange(initialDateRange);
                //redirect to trips
                router.push("/trips");
                router.refresh();
            }
        } catch (error) {
            toast.error("Reservation went wrong");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [totalPrice, dateRange, listing?._id, router, loginModal, currentUser])


    //to notice everytime i change in calendar
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if (dayCount && listing.price) {
                //not sure about cost per night
                setTotalPrice((dayCount + 1) * listing.price)
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [listing.price, dateRange])

    const category = useMemo(() => {
        return categories.find(item => item.label === listing.category);
    }, [listing.category])

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
                    <div className=" grid grid-cols-1 mt-4 gap-6 md:grid-cols-7">
                        <div className=" md:col-span-4">

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
                        <div className=" order-first md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default ListingClient