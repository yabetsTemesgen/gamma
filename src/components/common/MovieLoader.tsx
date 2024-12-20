"use client"
import { Movie } from "@/types/movie";
import PlayMovieIcon from "@/components/icons/PlayMovieIcon";
import { useRouter } from "next/navigation";
import error_image from "@/assets/images/error_image.png";
import Image from "next/image";

interface MovieLoaderProps {
  movies: Movie[];
  title: string;
  loading?: boolean;
}

//Check if the image url is valid
const isValidImageUrl = (url: string) => {
  if (!url) return false;
  if (url.includes("example.com")) return false;
  return true;
};


const MovieLoader = ({ movies, title, loading = false }: MovieLoaderProps) => {
  const router = useRouter();

  //Handle play button click
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
    <div className="flex justify-center mt-10 pb-5">
      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-2xl font-bold ml-3">{title}</h2>
        <div className="flex gap-4 overflow-x-auto px-2 max-w-[400px] lg:max-w-lg remove-scrollbars">
          {loading ?  (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="relative min-w-[150px] animate-pulse">
                <div className="mb-2 w-[148.5px] h-[220px] bg-gradient-to-r from-[#181818] to-[#2C2C2C]  rounded-[14px]" />
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
                <div className="absolute z-10 bottom-2 pl-8 py-2 text-center text-sm">
                  {movie.Title}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/38 to-black rounded-[14px]" />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-[14px] opacity-100 lg:opacity-0 lg:hover:opacity-100 transition-opacity"
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieLoader;