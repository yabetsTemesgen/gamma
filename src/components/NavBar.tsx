import React from "react";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-black text-white lg:pt-10 pb-5 p-7 h-[64px] lg:mb-10 ">
      <h1 className="text-3xl font-bold">GAMMA</h1>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
