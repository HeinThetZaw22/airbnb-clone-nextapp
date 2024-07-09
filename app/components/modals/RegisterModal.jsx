"use client";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "../../../app/hooks/useRegisterModal";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "../../../app/hooks/useLoginModal";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    // console.log("onSubmit fun");
    setIsLoading(true);
    try {

      const res = await fetch("api/register", {
        method: "POST",
        // headers: {
        //   "Content-type": "application/json",
        // },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Registed successfully");
        console.log("successfully registered");
        reset();
        registerModal.onClose();
        loginModal.onOpen();
      }
    } catch (error) {
      console.log(error);
      toast.error("Register fail");
    } finally {
      setIsLoading(false);
    }
  };

  const toggle = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };
  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading title={"Welcome to airbnb"} subtitle={"Create an account"} />
      <Input
        disabled={isLoading}
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />
      <Input
        disabled={isLoading}
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        disabled={isLoading}
        id="password"
        label="Password"
        type={"password"}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div>
      <hr />
      <Button
        outline
        label="Continue with Google"
        Icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        Icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div>
        <div className="flex flex-row justify-center gap-2 mt-3 items-center">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className=" text-neutral-800 hover:underline cursor-pointer"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      body={bodyContent}
      footer={footerContent}
      actionLabel={"Continue"}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
