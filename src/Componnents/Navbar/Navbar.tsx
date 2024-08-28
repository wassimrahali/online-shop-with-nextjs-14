"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { links } from "./data";
import Logo from "../Elements/Logo";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { UserButton, useUser } from "@clerk/nextjs";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { syncUserWithStrapi } from "../../utils/userUtils"; // Update import path
import CloseIcon from "../Elements/CloseIcon";
import HamburgerIcon from "../Elements/HamburgerIcon";
import LoaderComponent from "../Elements/LoaderComponnent";

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
                  <span className="absolute top-3.5 start-6">
                    <span className="flex relative -mt-2 ml-1">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
                    </span>
                  </span>
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
                
                <span className="absolute">
                  <span className="flex relative -mt-3.5 ml-6">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
                  </span>
                </span>
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


export default Navbar;
