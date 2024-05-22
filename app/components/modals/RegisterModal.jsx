"use client";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post("api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel={"Continue"}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
