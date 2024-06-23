"use client";
import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
const Modal = ({
  isOpen,
  disabled,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    //not to interfere animation
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    // console.log("handlesubmit clicked");
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        className=" fixed flex justify-center
       items-center z-50 outline-none inset-0
        bg-neutral-800/70"
      >
        <div
          className=" w-full h-full relative xl:w-2/5
            lg:w-3/6 md:w-4/6 my-6 mx-auto lg:h-auto md:h-auto"
        >
          {/* content  */}
          <div
            className={`transition duration-300 h-full 
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            {/* to get in column */}
            <div
              className="flex flex-col w-full h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg
              outline-none focus:outline-none bg-white"
            >
              {/* header  */}
              <div
                className="p-6 rounded-t flex items-center
               relative justify-center border-b-[1px]"
              >
                <button
                  onClick={handleClose}
                  className=" absolute transition hover:opacity-70 left-9 p-1"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* body  */}
              {/* flex-auto removed  */}
              <div className=" p-6 relative">{body}</div>
              {/* footer  */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center w-full gap-4">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                      label={secondaryActionLabel}
                    />
                  )}

                  <Button
                    disabled={disabled}
                    onClick={handleSubmit}
                    label={actionLabel}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
