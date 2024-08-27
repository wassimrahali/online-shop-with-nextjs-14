import React from "react";
import { social_media } from "./data";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col items-center p-4  ">
      <p className="text-sm text-gray-700 dark:text-gray-800">
        © 2028 All copyrights reserved.
      </p>
      <div className="mt-4">
        <div className="flex flex-wrap justify-center gap-4">
          {social_media.map((icons) => (
            <Image
              key={icons.id}
              width={25}
              height={25}
              src={icons.url}
              alt={icons.alt}
              className="w-6 h-6 dark:invert cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
