import React, { useEffect } from "react";
import icon from "../../app/assets/shopping-cart-icon.svg";
import Image from "next/image";
import { useCart } from "@/Context/CartContext";
import Link from "next/link";

const AddToCartButton = () => {
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    console.log('Cart items:', cartItems);
  }, [cartItems]);



  return (
    <div className="flex justify-between items-center space-x-2 cursor-pointer">
      <Link className="flex justify-between items-center space-x-2 cursor-pointer" href="/order">
        <Image src={icon} width={25} height={25} alt="icon-cart" />
        <p>({cartItems.length})</p>
      </Link>

    </div>
  );
};

export default AddToCartButton;
