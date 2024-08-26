"use client";
import React, { useState } from "react";
import { useCart } from "@/Context/CartContext";
import Image from "next/image";
import { Rubik } from "next/font/google";
import { useRouter } from "next/navigation";

const rubik = Rubik({ subsets: ["latin"] });

const OrderComponent: React.FC = () => {
  const router = useRouter();
  const { cartItems, removeFromCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountMessage, setDiscountMessage] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discount = isDiscountApplied ? subtotal * 0.2 : 0;
  const total = subtotal - discount;

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const handleApplyDiscount = () => {
    if (discountCode === "SHOP239") {
      setIsDiscountApplied(true);
      setDiscountMessage("Discount applied successfully!");
    } else {
      setIsDiscountApplied(false);
      setDiscountMessage("Invalid discount code.");
    }
  };

  const handleCheckout = () => {
    router.push('/checkout?source=order');
  };

  return (
    <section className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-3xl mb-36 px-4 sm:px-6 lg:px-8">
      <header className="text-left mb-8">
  <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">YOUR CART</h1>
</header>


        <div>
          {cartItems.length === 0 ? (
            <p className="text-center text-red-500">Sorry, but you haven't selected any products!</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <h3 className="text-sm text-gray-900">{item.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-slate-950">{item.price} DT</p>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-600 transition hover:text-red-600"
                      >
                        <span className="sr-only">Remove item</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <dl className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-700">
                    <dt>Subtotal</dt>
                    <dd>{subtotal.toFixed(2)} DT</dd>
                  </div>
                  <div className={`flex justify-between text-sm ${isDiscountApplied ? 'text-green-700' : 'text-gray-700'}`}>
                    <dt>Discount</dt>
                    <dd className={isDiscountApplied ? 'text-green-700' : ''}>-{discount.toFixed(2)} DT</dd>
                  </div>
                  <div className="flex justify-between text-base font-medium">
                    <dt>Total</dt>
                    <dd>{total.toFixed(2)} DT</dd>
                  </div>

                  <div className="space-y-6 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter discount code"
                      className="border border-slate-300 p-2 w-full sm:w-auto"
                    />
                    <button
                      onClick={handleApplyDiscount}
                      className="bg-pink-600 px-5 py-2 text-sm text-white transition hover:bg-gray-600 w-full sm:w-auto"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handleCheckout}
                      className="bg-green-400 px-5 py-2 text-sm text-white transition hover:bg-gray-600 w-full sm:text-center"
                    >
                      Checkout
                    </button>                  
                  </div>

                  {discountMessage && (
                    <div
                      className={`p-4 rounded-md text-sm ${
                        discountMessage.startsWith("Invalid")
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-green-500"
                      }`}
                    >
                      {discountMessage}
                    </div>
                  )}
                </dl>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderComponent;
