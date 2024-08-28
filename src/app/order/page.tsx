"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartItem {
  productId: number;
  quantity: number;
}

interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}

const OrderComponent: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountMessage, setDiscountMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/carts/1'); 
        const data: Cart = await response.json();
        setCartItems(data.products);
        
        const productResponses = await Promise.all(
          data.products.map((item) => fetch(`https://fakestoreapi.com/products/${item.productId}`))
        );
        const productsData = await Promise.all(productResponses.map((res) => res.json()));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCartData();
  }, []);

  const getCartProduct = (productId: number) => {
    return products.find(product => product.id === productId);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const product = getCartProduct(item.productId);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  const discount = isDiscountApplied ? subtotal * 0.2 : 0;
  const total = subtotal - discount;

  const handleRemove = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const handleApplyDiscount = () => {
    if (discountCode === "Wassim") {
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
        <header className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Cart</h1>
        </header>

        {loading ? (
          <SkeletonLoader /> 
        ) : (
          <div>
            {cartItems.length === 0 ? (
              <p className="text-center text-red-500">Sorry, but you haven’t selected any products!</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {cartItems.map((item) => {
                    const product = getCartProduct(item.productId);
                    return product ? (
                      <li key={product.id} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={50}
                            height={50}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div>
                            <h3 className="text-sm text-gray-900">{product.title}</h3>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-slate-950">{(product.price * item.quantity).toFixed(2)} DT</p>
                          <button
                            onClick={() => handleRemove(product.id)}
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
                    ) : null;
                  })}
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
                        className="bg-slate-800 px-5 py-[10.75px] text-sm text-white transition hover:bg-gray-600 w-full sm:w-auto"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={handleCheckout}
                        className="bg-primary px-5 py-2 text-sm text-white transition hover:bg-gray-600 w-full sm:text-center"
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
        )}
      </div>
    </section>
  );
};


const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 border rounded bg-gray-200">
        <div className="w-16 h-16 bg-gray-300 rounded animate-pulse"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
          <div className="h-3 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="h-6 bg-gray-300 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  );
};



export default OrderComponent;
