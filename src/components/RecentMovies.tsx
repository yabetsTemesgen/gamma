import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import PlayMovieIcon from "./icons/PlayMovieIcon";
import error_image from "@/assets/images/error_image.png";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface RecentMoviesProps {
  movies: Movie[];
}

const isValidImageUrl = (url: string) => {
  if (!url) return false;
  if (url.includes("example.com")) return false;
  return true;
};

const RecentMovies = ({ movies }: RecentMoviesProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (movies.length > 0) {
      setLoading(false);
    }
  }, [movies]);

  const handlePlayClick = (
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
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-2xl font-bold ml-5 lg:ml-2">Recent Movies</h2>
        <div className="flex gap-4 overflow-x-auto px-2 max-w-sm lg:max-w-lg remove-scrollbars">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="relative min-w-[150px] animate-pulse">
                <div className="mb-2 w-[148.5px] h-[220px] bg-gray-900 rounded-[14px]" />
              </div>
            ))
          ) : (
            movies.map((movie, index) => (
              <div key={index} className="relative min-w-[150px]">
                <Image
                  src={
                    isValidImageUrl(movie.cover_img_url || "")
                      ? (movie.cover_img_url as string)
                      : error_image.src
                  }
                  alt={movie.Title || ""}
                  width={148.5}
                  height={220}
                  className="mb-2 w-[148.5px] h-[220px] rounded-[14px]"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-[14px] opacity-0 hover:opacity-100 transition-opacity"
                  onClick={() =>
                    handlePlayClick(
                      movie.video_url || "",
                      movie.cover_img_url || "",
                      movie.Title || ""
                    )
                  }
                >
                  <PlayMovieIcon />
                </button>
                <p className="text-center text-sm">{movie.Title}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentMovies;
