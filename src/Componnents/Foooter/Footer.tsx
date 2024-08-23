import React from "react";
import styles from "./Footer.module.css";
import { social_media } from "./data";
import Image from "next/image";
const Footer = () => {
  return (
    <div className={styles.container}>
      © 2028 All copyrights reserved.
      <div className={styles.social_media}>
        <div className={styles.icons}>
          {social_media.map((icons) => (
            <Image
              key={icons.id}
              width={25}
              height={25}
              src={icons.url}
              alt={icons.alt}
              className={styles.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
