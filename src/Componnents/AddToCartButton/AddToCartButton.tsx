import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/Context/CartContext";
import icon from "../../app/assets/shopping-cart-icon.svg";

const AddToCartButton: React.FC = () => {
  const { cartItems } = useCart();

  useEffect(() => {
    console.log("Cart items:", cartItems);
  }, [cartItems]);

  return (
    <div className="relative flex items-center space-x-4 cursor-pointer">
      <Link href="/order">
        <div className="flex items-center space-x-2">
          <Image src={icon} width={25} height={25} alt="Cart Icon" />
        <p>({cartItems.length})</p>
        </div>

      </Link>
      {cartItems.length > 0 && (
        <>
          {/* For larger screens */}
         

          <span className="flex absolute -mt-4 ml-10">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary">
                </span>
              </span>

          {/* For smaller screens */}
          <div className="flex md:hidden absolute -mt-5 ml-4">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCartButton;
