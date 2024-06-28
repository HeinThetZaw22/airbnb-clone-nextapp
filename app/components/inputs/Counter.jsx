"use client";
import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter = ({ title, subtitle, value, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);
  return (
    <div className=" flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-neutral-400">{subtitle}</div>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <div
          onClick={onReduce}
          className=" size-10 rounded-full border-[1px] border-neutral-400 hover:opacity-80 transition cursor-pointer flex items-center justify-center text-neutral-600"
        >
          <AiOutlineMinus />
        </div>
        <div className=" font-light text-xl text-neutral-600"> {value}</div>
        <div
          onClick={onAdd}
          className=" size-10 rounded-full border-[1px] border-neutral-400 hover:opacity-80 transition cursor-pointer flex items-center justify-center text-neutral-600"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
