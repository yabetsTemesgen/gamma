"use client";
import React, { useState } from "react";
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
  const router = useRouter();

  const handleSearch = async () => {
    if (!search.trim()) return;

    setIsLoading(true);
    try {
      const results = await fetchMainMovie(search);
      setSearchResults(Array.isArray(results) ? results : [results]);
      setIsOpen(true);
    } catch (error) {
      toast.error(`Error searching the movie ${search}`);
      console.log("Error searching the movie:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleWatchNow = (videoUrl: string, coverImgUrl: string, Title: string) => {
    router.push(
      `/player?videoUrl=${encodeURIComponent(videoUrl)}&coverImgUrl=${encodeURIComponent(
        coverImgUrl
      )}&title=${encodeURIComponent(Title)}`
    );
    setIsOpen(false);
  };

  const toggleSearchVisibility = () => {
    const newVisibility = !isSearchVisible;
    setIsSearchVisibleLocal(newVisibility);
    setIsSearchVisible(newVisibility);
  };

  return (
    <>
      <SearchField
        search={search}
        setSearch={setSearch}
        handleKeyPress={handleKeyPress}
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