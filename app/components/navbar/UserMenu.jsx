"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avator from "../Avator";
import { useCallback, useRef, useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../../app/hooks/useRegisterModal";
import useLoginModal from "../../../app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import useRentModal from "../../../app/hooks/useRentModal";
import { useRouter } from "next/navigation";

const UserMenu = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onRent = useCallback(() => {
    if (!currentUser) {
      registerModal.onOpen();
    } else {
      rentModal.onOpen();
    }
  }, [registerModal, rentModal, currentUser]);
  return (
    <div className=" relative" ref={menuRef}>
      <div className=" flex flex-row items-center gap-2">
        <div
          onClick={onRent}
          className="hidden md:block 
            text-sm font-semibold cursor-pointer
             hover:bg-neutral-100 rounded-full px-4 py-3"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-2 md:px-2 hover:shadow-md transition flex flex-row items-center gap-3 text-sm font-semibold
          rounded-full bg-neutral-200 cursor-pointer
        "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avator className="w-auto h-auto" />
          </div>
        </div>
        {isOpen && (
          <div className=" absolute top-12 right-0 bg-white overflow-hidden rounded-xl w-[40vw] md:w-3/4 shadow-md text-sm">
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItem onClick={() => router.push("/trips")} label="My trips" />
                  <MenuItem onClick={() => {}} label="My favourites" />
                  <MenuItem onClick={() => {}} label="My properties" />
                  <MenuItem onClick={() => router.push("/reservations")} label="My reservations" />
                  <MenuItem
                    onClick={rentModal.onOpen}
                    label="Airbnb your home"
                  />
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </>
              ) : (
                <>
                  <MenuItem onClick={loginModal.onOpen} label="Login In" />
                  <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
