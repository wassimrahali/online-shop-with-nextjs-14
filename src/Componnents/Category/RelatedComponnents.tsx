// components/RelatedProducts.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "../StarRating/StarRating";

interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No related products found.</p>;
  }

  return (
    <div className="mt-10">
              <div className="relative space-y-5">
        {/* <BreadCrumps productId={""} product={""} />  */}
        <h2 className="text-lg font-semibold text-gray-800">
          RELATED PRODUCTS {" "}
        </h2>
        <div className="absolute left-0 mt-2 h-0.5 w-8 bg-primary"></div>
        <div className="mt-2.5 h-0.5 bg-gray-200"></div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
  
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="max-w-md mx-auto  rounded-md flex flex-col justify-between  h-[430px] duration-300 hover:bg-slate-100 "
          >
            <Link href={`/products/${product.id}`} passHref>
              <div className="flex flex-col h-full">
                <div>
                  <Image
                    width={500}
                    height={300}
                    quality={75}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-md hover:opacity-60 transition-all duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                      <StarRating
                        rating={product.rating.rate}
                        reviewCount={product.rating.count}
                      />
                    <p className="text-green-500  mt-2">{product.price} DT</p>
                  
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      </div>
    </div>
    );
};

export default RelatedProducts;
