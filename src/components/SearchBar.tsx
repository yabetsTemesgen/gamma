"use client";
import React, { useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    //Todo: Implement search functionality
    console.log("Searching for:", search);
  };

  return (
    <div className="flex items-center w-[50px] lg:w-[352px] py-3 px-[5px] rounded-l-md lg:bg-[#1D1D1D] text-[#C9C9C9]">
      <SearchIcon />
      <input
        type="text"
        placeholder="What do you want to watch?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent focus:outline-none hidden lg:block ml-2"
      />
    </div>
  );
};

export default SearchBar;
