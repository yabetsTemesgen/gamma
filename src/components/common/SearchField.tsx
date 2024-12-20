import React from "react";
import SearchIcon from "@/components/icons/SearchIcon";

interface SearchFieldProps {
  search: string;
  setSearch: (value: string) => void;
  isSearchVisible: boolean;
  toggleSearchVisibility: () => void;
}

const SearchField = ({
  search,
  setSearch,
  isSearchVisible,
  toggleSearchVisibility,
}: SearchFieldProps) => {
  return (
    <div
      className={`flex items-center py-3 px-[5px] rounded-md transition-all ${
        isSearchVisible
          ? "w-full ml-10 lg:ml-0 lg:w-[352px] bg-[#1D1D1D]"
          : "w-[45px]"
      } lg:w-[352px] lg:bg-[#1D1D1D] text-[#C9C9C9]`}
    >
      <button
        onClick={toggleSearchVisibility}
        className="hover:text-white transition-colors lg:pointer-events-none"
      >
        <SearchIcon />
      </button>
      <input
        type="text"
        placeholder="What do you want to watch?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`bg-transparent focus:outline-none ml-2 w-full ${
          isSearchVisible ? "block" : "hidden"
        } lg:block`}
      />
    </div>
  );
};

export default SearchField;
