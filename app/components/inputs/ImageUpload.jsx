"use client";

import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import { useEffect, useState } from "react";
 
export default function ImageUpload({value, onChange}) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (value) {
      setImageUrl(value);
    }
  }, [value]);
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // console.log("Files: ", res);
          setImageUrl(res[0].url);
          onChange(res[0].url);
          // alert("Upload Completed");
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrl.length ? (
        <div className=" flex items-center justify-center">
          <Image src={imageUrl} width={500} height={300} alt="my image" />
        </div>
      ) : null}
    </div>
  );
}