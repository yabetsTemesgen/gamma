import React from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@/components/icons/CloseIcon';
import { Movie } from '@/types/movie';
import error_image from '@/assets/images/error_image.png';

interface SearchPortalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsSearchVisibleLocal: (value: boolean) => void;
  setIsSearchVisible: (value: boolean) => void;
  isLoading: boolean;
  searchResults: Movie[];
  handleWatchNow: (videoUrl: string, coverImgUrl: string, Title: string) => void;
}

const SearchPortal = ({
  isOpen,
  setIsOpen,
  setIsSearchVisibleLocal,
  setIsSearchVisible,
  isLoading,
  searchResults,
  handleWatchNow,
}: SearchPortalProps) => {
  if (!isOpen) return null;

  return createPortal(
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
                        target.src = error_image.src;
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
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchPortal;