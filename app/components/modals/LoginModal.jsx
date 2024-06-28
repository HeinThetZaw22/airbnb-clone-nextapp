"use client";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useLoginModal from "../../../app/hooks/useLoginModal";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "../../../app/hooks/useRegisterModal";

const LoginModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("logged in");
        router.refresh();
        loginModal.onClose();
        reset();
      }
      if (callback?.error) {
        toast.error(callback?.error);
      }
    });
  };

  const toggle = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };
  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading title={"Welcome back"} subtitle={"Login to your account"} />
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
          <div>You don't have an account?</div>
          <div
            onClick={toggle}
            className=" text-neutral-800 hover:underline cursor-pointer"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      body={bodyContent}
      footer={footerContent}
      actionLabel={"Continue"}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginModal;
