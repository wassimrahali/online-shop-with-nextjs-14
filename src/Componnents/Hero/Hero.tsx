import styles from "./Hero.module.css";
import Image from "next/image";

import hero from "../../app/assets/hero.svg";
import React from "react";
function Hero() {
  return (
    
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between px-4 py-8">
      <div className="text-center sm:text-left sm:w-1/2">
        <div className={styles.col}>
          <div className="text-4xl sm:text-6xl">
            <h1 className={`${styles.title}`}>
              Your best Online shop Destination!
            </h1>
          </div>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            quibusdam, consectetur beatae doloribus unde repellat nobis.
          </p>
          <div>
            <button className={styles.button}>Shop Now</button>
          </div>
        </div>
      </div>
      <div className="sm:w-1/2 mb-8 sm:mb-0">
        <Image src={hero} className="w-full h-auto" alt="Hero Img" />
      </div>
    </div>
  );
}

export default Hero;
