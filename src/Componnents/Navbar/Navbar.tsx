"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { links } from "./data";
import Logo from "../Elements/Logo";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Loader from "../../app/assets/loader.svg";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { syncUserWithStrapi } from "../../utils/userUtils"; // Update import path

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      syncUserWithStrapi(user);
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoaderComponent />;

  return (
    <>
      <nav className="w-full border-b md:border-0 md:static shadow-sm">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <Logo />
            </Link>
            <div className="md:hidden">
              <div className="flex justify-center items-center space-x-4">
                {user && <AddToCartButton />}
                {!user ? (
                  <Link className="bg-primary py-2 px-4 text-slate-50 font-light" href="/sign-in">
                    Login
                  </Link>
                ) : (
                  <div className="relative me-4">
                    <UserButton afterSignOutUrl="/" />
                    <span className="top-3.5 start-6 absolute w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                )}
                <button
                  className="text-primary outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {links.map((link) => (
                <li
                  key={link.id}
                  className="text-gray-600 hover:text-primary hover:underline hover:underline-offset-4"
                >
                  <a href={link.url}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0">
            <div className="flex space-x-10">
              {user && <AddToCartButton />}
              {!user ? (
                <Link className="bg-primary py-2 px-4  text-slate-50 font-light" href="/sign-in">
                  Login
                </Link>
              ) : (
                <div className="relative me-4">
                  <UserButton afterSignOutUrl="/" />
                  <span className="top-3.5 start-6 absolute w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <DarkModeToggle />
    </>
  );
};

const LoaderComponent = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
    <Image
      priority={true}
      src={Loader}
      className="rounded-full h-28 w-28"
      alt="Loading"
      width={112}
      height={112}
    />
  </div>
);

const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export default Navbar;
