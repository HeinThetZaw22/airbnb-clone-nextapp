"use client";

import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { OurFileRouter } from "../../api/uploadthing/core";
 
interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value, 
  onChange
}) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (value) {
      setImageUrl(value);
    }
  }, [value]);
  
  return (
    <div>
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // console.log("Files: ", res);
          setImageUrl(res[0].url);
          onChange(res[0].url);
          // alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrl.length ? (
        <div className=" flex items-center justify-center">
          {/* <Image 
          src={imageUrl} 
          width={500} 
          height={300} 
          alt="my image" /> */}
          <img className=" w-[500px] h-[300px]" src={imageUrl} alt="Image is loading" />
        </div>
      ) : null}
    </div>
  );
}

export default ImageUpload;