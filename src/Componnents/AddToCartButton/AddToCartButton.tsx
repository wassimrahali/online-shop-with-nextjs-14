import React from "react";
import icon from "../../app/assets/shopping-cart-icon.svg";
import Image from "next/image";

import { useCart } from "@/Context/CartContext";
const AddToCartButton = () => {
  const { addToCart } = useCart();

  return (
    <div className="flex justify-between items-center space-x-2 cursor-pointer">
      <Image src={icon} width={25} height={25} alt="icon-cart" />
      <p>({addToCart})</p>
    </div>
  );
};

export default AddToCartButton;
