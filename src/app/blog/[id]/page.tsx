"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "../../../Componnents/Skeleton/Skeleton";
import BreadCrumps from "@/Componnents/BreadCrumps/BreadCrumps";
import { useCart } from "@/Context/CartContext";
import StarRating from "../../../Componnents/StarRating/StarRating";
import { Rubik } from "next/font/google";
const rubik = Rubik({ subsets: ["latin"] });
interface Params {
  id: string;
}

const Post = ({ params }: { params: Params }) => {
  const { cartItems, addToCart } = useCart();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const productData = await res.json();
        setData(productData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load product data.");
        setLoading(false);
      }
    };

    fetchProduct(params.id);
  }, [params.id]);

  useEffect(() => {
    console.log("Cart items in Post:", cartItems);
  }, [cartItems]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    const itemToAdd = {
      id: data.id,
      title: data.title,
      price: data.price,
      image: data.image,
    }; // Adjust as necessary
    addToCart(itemToAdd);
  };

  return (

    
    <div className="mt-5">
      <BreadCrumps product={data.title} productId={data.id} />
      <div className="max-w-4xl mx-auto p-6">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
          <p className="mt-2 text-gray-600">{data.description}</p>
        </header>

        <div className="flex justify-center mb-6">
          <Image
            alt={data.title}
            src={data.image}
            width={300}
            height={300}
            className="w-2/4 h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="text-gray-700 leading-relaxed">
          <p>{data.description}</p>
          <p className="w-full mt-4 py-2 text-green-600 rounded text-lg">
            {data.price} DT
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <span className="mr-2">Rating:</span>
            <StarRating
              rating={data.rating.rate}
              reviewCount={data.rating.count}
            />
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Additional Information
            </h2>
            <p>
              Here you can add more details or related information about the
              product.
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary mt-5 hover:bg-gray-300 text-white font-bold py-2 px-4"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
