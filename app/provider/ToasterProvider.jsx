"use client";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <div>
      <Toaster position="top-left" />
    </div>
  );
};

export default ToasterProvider;
