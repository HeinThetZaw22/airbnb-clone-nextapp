"use client";
import Container from "../Container";
import { TbMountain, TbBeach, TbPool } from "react-icons/tb";
import {
  GiIsland,
  GiCaveEntrance,
  GiWindmill,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCactus,
  GiBarn,
  GiPalmTree,
} from "react-icons/gi";
import { PiShippingContainerBold } from 'react-icons/pi'
import { IoBoatOutline, IoDiamond, IoFlame } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { FaArrowRight, FaSkiing } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This is close to the beach",
  },
  {
    label: "Windmill",
    icon: GiWindmill,
    description: "This is close to the beach",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This is close to the beach",
  },
  {
    label: "Mountain",
    icon: TbMountain,
    description: "This is close to the beach",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This is close to the beach",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This is close to the beach",
  },
  {
    label: "BoatFishing",
    icon: GiBoatFishing,
    description: "This is close to the beach",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This is close to the Skiing",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This is close to the Castle",
  },
  {
    label: "Forest",
    icon: GiForestCamp,
    description: "This is close to the Snow",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This is close to the Snow",
  },
  {
    label: "Snow",
    icon: BsSnow,
    description: "This is close to the Snow",
  },
  {
    label: "Deserts",
    icon: GiCactus,
    description: "This is close to the Snow",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This is close to the Snow",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This is close to the Snow",
  },
  {
    label: "Container",
    icon: PiShippingContainerBold,
    description: "This is container house"
  },
  {
    label: "House Boat",
    icon: IoBoatOutline,
    description: "This is house inside a boat"
  },
  {
    label: "Camping",
    icon: IoFlame,
    description: "This is trending house"
  },
  {
    label: "Tropical",
    icon: GiPalmTree,
    description: "This is tropical region"
  }
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  //category bar just need to be in main page
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    //if it is in detailed page, category not to show
    return null;
  }

  return (
    <Container>
      <div className=" pt-4 max-sm:pt-1 gap-1 md:gap-4 flex scroll-smooth flex-row justify-between items-center overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
