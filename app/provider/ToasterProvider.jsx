"use client";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <div>
      <Toaster position="top-center" />
    </div>
  );
};

export default ToasterProvider;
