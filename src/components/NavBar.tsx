"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  if (pathname === "/player") {
    return (
      <nav className="hidden md:flex items-center justify-between bg-black text-white lg:py-10 p-7 h-[64px]">
        <Link href={"/"}><h1 className="text-3xl font-bold">GAMMA</h1></Link>
        <SearchBar setIsSearchVisible={setIsSearchVisible} />
      </nav>
    );
  }
  return (
    <nav className="flex items-center justify-between bg-black text-white lg:py-10 p-7 h-[64px]">
      {!isSearchVisible && (
        <Link href={"/"}><h1 className="text-3xl font-bold">GAMMA</h1></Link>
      )}
      <SearchBar setIsSearchVisible={setIsSearchVisible} />
    </nav>
  );
};

export default Navbar;