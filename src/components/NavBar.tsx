"use client";
import React from "react";
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/player") {
    return (
      <nav className="hidden md:flex items-center justify-between bg-black text-white lg:py-10 p-7 h-[64px]">
        <h1 className="text-3xl font-bold">GAMMA</h1>
        <SearchBar />
      </nav>
    );
  }
  return (
    <nav className="flex items-center justify-between bg-black text-white lg:py-10 p-7 h-[64px]">
      <h1 className="text-3xl font-bold">GAMMA</h1>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
