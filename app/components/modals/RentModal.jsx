"use client";

import useRentModal from "../../../app/hooks/useRentModal";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import { useRouter } from "next/navigation";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import toast from "react-hot-toast";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const rentModal = useRentModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    watch,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  //since we don't have input, we have custom cateInput, so we must watch with react-form
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id, value) => {
    if (watch(id) !== value) {
      // Check if the new value is different from the current value
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const onSubmit = async (data) => {
    if(step !== STEPS.PRICE){
      return onNext();
    }
    setIsLoading(true);
    // console.log("form data",JSON.stringify(data));
    
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      } );
      if (res.ok) {
        toast.success("Listing created successfully");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      }
    } catch (error) {
      toast.error("Creating list fail");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className=" flex flex-col gap-8">
      <Heading
        title="Which of there best describes your place"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div className=" col-span-1" key={item.label}>
            {/* {item.label} */}
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Share some basics about your places"
          subtitle="What amenities do you have?"
        />
        <Counter
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );
  }
  
  if(step === STEPS.IMAGES) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
         <Heading title="Upload your image"
         subtitle="Help your guest discover" />
         <ImageUpload value={imageSrc} onChange={(value) => setCustomValue("imageSrc", value)} />
      </div>
    )
  };

  if(step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading title="How would you define your place?"
         subtitle="Describe your place" />
         <Input id="title"
         label="Title"
         disabled={isLoading}
         register={register} 
         errors={errors}
         required/>
         <Input id="description"
         label="Description"
         disabled={isLoading}
         register={register} 
         errors={errors}
         required/>
      </div>
    )
  }

  if(step === STEPS.PRICE) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading title="Add a price to your place"
        subtitle="How much do you charge per night?" />
        <Input id="price"
        label="Price"
        formatPrice
        register={register}
        errors={errors}
        required
         />
      </div>
    )
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
};

export default RentModal;
