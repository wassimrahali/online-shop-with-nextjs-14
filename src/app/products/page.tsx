"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";
import BreadCrumps from "@/Componnents/BreadCrumps/BreadCrumps";
import { Rubik } from "next/font/google";
import Skeleton from "@/Componnents/Skeleton/Skeleton";
const rubik = Rubik({ subsets: ["latin"] });

const Products = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return <Skeleton />;
  }

  
 

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-10">
      {/* <BreadCrumps productId={""} product={""} />  */}
      <div className="relative space-y-5">
        <h2 className="text-lg font-semibold text-gray-800">
          SPECIAL OFFRE !{" "}
        </h2>
        <div className="absolute left-0 mt-2 h-0.5 w-8 bg-primary"></div>
        <div className="mt-2.5 h-0.5 bg-gray-200"></div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <div className="text-center"></div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {paginatedData.map((product: any) => (
            <article
              className="max-w-md mx-auto  rounded-md flex flex-col justify-between h-full  hover:bg-slate-100 hover:opacity-90 transition-all duration-300 "
              key={product.id}
            >
              <Link
                href={`/products/${product.id}`}
                className="flex flex-col h-full"
              >
                <div>
                  <Image
                    width={500}
                    height={300}
                    quality={75}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-md hover:opacity-60 transition-all duration-300"
                  />
                  <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                    <span className="block text-slate-900 ">
                      {product.title}
                    </span>
                    <div className="flex mt-4"></div>
                  </div>
                </div>
                <div className="mt-auto pt-4 pb-4 ml-4 mr-4">
                  <button className="w-full px-4 py-2 text-black rounded text-sm ">
                    <p className="text-green-500"> {product.price} DT</p>
                    {/* <p>{product.category}</p> */}
                  </button>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Products;