"use client";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../Componnents/Navbar/Navbar";
import { Inter } from "next/font/google";
import Footer from "../Componnents/Foooter/Footer";
import ThemeProvider from "../Context/ThemeContext";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "../Context/CartContext";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en" className={inter.className}>
          <body suppressHydrationWarning={true}>
            <ThemeProvider>
              <div className="container mx-auto">
                <Navbar />
                {children}
                <Footer />
              </div>
            </ThemeProvider>
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
