import { Metadata } from "next/types";
import Products from "../app/products/page";
import React from "react";
import Hero from "@/Componnents/Hero/Hero";

export const metadata: Metadata = {
  title: "Home",
  description: "Generated by Wassim Rahali",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
    </>
  );
}
