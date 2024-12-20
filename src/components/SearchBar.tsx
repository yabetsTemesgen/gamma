"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import SearchIcon from "@/components/icons/SearchIcon";
import { fetchMainMovie } from "@/services/movieService";
import { Movie } from "@/types/movie";
import CloseIcon from "./icons/CloseIcon";
import { useRouter } from "next/navigation";
import error_image from "@/assets/images/error_image.png";
import { toast } from "react-toastify";

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
      )} &title=${encodeURIComponent(Title)}`
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
      <div
        className={`flex items-center py-3 px-[5px] rounded-md transition-all ${
          isSearchVisible ? "w-full ml-10 lg:ml-0 lg:w-[352px] bg-[#1D1D1D]" : "w-[45px]"
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
          onKeyPress={handleKeyPress}
          className={`bg-transparent focus:outline-none ml-2 w-full ${
            isSearchVisible ? "block" : "hidden"
          } lg:block`}
        />
      </div>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-80 lg:bg-opacity-70 h-[100vh] z-50 flex items-start justify-end p-4 mt-20">
            <div className="relative bg-[#1D1D1D] text-white max-w-xl w-full rounded-lg shadow-xl">
                <button
                onClick={() => {
                  setIsOpen(false);
                  setIsSearchVisibleLocal(false);
                  setIsSearchVisible(false);
                }}
                className="absolute right-1 top-1 mb-2 text-gray-400 hover:text-white"
                >
                <CloseIcon />
                </button>

              <div className="p-6">

                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto remove-scrollbars">
                    {searchResults.map((movie, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleWatchNow(
                            movie.video_url || "",
                            movie.cover_img_url || "",
                            movie.Title || ""
                          )
                        }
                        className="flex gap-3 py-3 px-1 w-full h-[106px] bg-black/20 rounded-[10px] hover:bg-black/30 transition-colors cursor-pointer"
                      >
                        <div className="w-32 h-48 relative overflow-hidden rounded">
                          <img
                            src={movie.cover_img_url}
                            alt={movie.Title}
                            className="w-[82px] h-[82px] object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =error_image.src;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold">{movie.Title}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm">
                              {movie.rating ? movie.rating : "No Rating"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4">No results found</p>
                )}
              </div>
              <div
                className="fixed inset-0 z-[-1]"
                onClick={() => setIsOpen(false)}
              ></div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default SearchBar;

