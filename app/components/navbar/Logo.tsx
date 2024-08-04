"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      className="hidden sm:block cursor-pointer"
      src="/images/air.png"
      width={90}
      height={90}
      alt="logo"
    />
  );
};

export default Logo;
