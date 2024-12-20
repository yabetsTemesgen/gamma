"use client";
import React, { useState, useRef } from "react";
import { fetchMainMovie } from "@/services/movieService";
import { Movie } from "@/types/movie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SearchField from "./common/SearchField";
import SearchPortal from "./common/SearchPortal";

interface SearchBarProps {
  setIsSearchVisible: (isVisible: boolean) => void;
}

const SearchBar = ({ setIsSearchVisible }: SearchBarProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisibleLocal] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  //Handle search functionality
  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const results = await fetchMainMovie(searchTerm);
      setSearchResults(Array.isArray(results) ? results : [results]);
      setIsOpen(true);
    } catch (error) {
      toast.error(`Error searching the movie ${searchTerm}`);
      console.log("Error searching the movie:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  //Handle search input change
  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 500);
  };

  //Handle watch now button click
  const handleWatchNow = (
    videoUrl: string,
    coverImgUrl: string,
    Title: string
  ) => {
    router.push(
      `/player?videoUrl=${encodeURIComponent(
        videoUrl
      )}&coverImgUrl=${encodeURIComponent(
        coverImgUrl
      )}&title=${encodeURIComponent(Title)}`
    );
    setIsOpen(false);
  };

  //Toggle search visibility
  const toggleSearchVisibility = () => {
    const newVisibility = !isSearchVisible;
    setIsSearchVisibleLocal(newVisibility);
    setIsSearchVisible(newVisibility);
  };

  return (
    <>
      <SearchField
        search={search}
        setSearch={handleSearchChange}
        isSearchVisible={isSearchVisible}
        toggleSearchVisibility={toggleSearchVisibility}
      />
      <SearchPortal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsSearchVisibleLocal={setIsSearchVisibleLocal}
        setIsSearchVisible={setIsSearchVisible}
        isLoading={isLoading}
        searchResults={searchResults}
        handleWatchNow={handleWatchNow}
      />
    </>
  );
};

export default SearchBar;
