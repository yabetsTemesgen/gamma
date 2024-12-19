import React from "react";
import SearchBar from "./SearchBar";

const Navbar= () => {
  return (
    <nav className="flex items-center justify-between bg-black text-white lg:py-10 p-7 h-[64px] ">
      <h1 className="text-3xl font-bold">GAMMA</h1>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
