"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Movie } from "@/types/movie";
import StarIcon from "@/components/icons/StarIcon";
import PlayVideoIcon from "@/components/icons/PlayVideoIcon";
import error_image from "@/assets/images/error_image.png";

interface MovieSliderProps {
  movies: Movie[];
  settings: object;
  isValidImageUrl: (url: string) => boolean;
  handleWatchNow: (videoUrl: string, coverImgUrl: string, Title: string) => void;
}

const MovieSlider = ({
  movies,
  settings,
  isValidImageUrl,
  handleWatchNow,
}:MovieSliderProps) => {
  return (
    <Slider {...settings}>
      {movies.map((movie, index) => (
        <div key={index} className="relative mb-8 overflow-hidden md:rounded-xl ">
          {/* Background Blur Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0 bg-gradient-to-r from-black/87 to-black/54 hidden md:block"
            style={{
              backgroundImage: `url(${
                isValidImageUrl(movie.cover_img_url || "")
                  ? movie.cover_img_url
                  : error_image
              })`,
              filter: "blur(49px)",
              WebkitFilter: "blur(49px)",
            }}
          />
          {/* Content Container */}
          <div className="relative z-10 flex lg:p-8">
            <div className="flex flex-col lg:flex-row items-center w-full max-w-5xl lg:gap-9">
              <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/38 to-black blur-[49px]"></div>
                <Image
                  src={
                    isValidImageUrl(movie.cover_img_url || "")
                      ? (movie.cover_img_url as string)
                      : error_image
                  }
                  alt={movie.Title || "Movie Cover Image"}
                  width={1000}
                  height={1000}
                  className="w-[120%] sm:max-w-[450px] lg:w-full lg:max-w-none lg:h-[590px] sm:rounded-[27px] object-cover"
                  onError={(e) => {
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.src = error_image.src;
                  }}
                />
                <button
                  className="absolute bottom-4 bg-white w-2/3 sm:w-1/3 py-3 px-4 rounded-xl text-black lg:hidden mt-4 flex items-center justify-center"
                  onClick={() =>
                    handleWatchNow(
                      movie.video_url || "",
                      movie.cover_img_url || "",
                      movie.Title || ""
                    )
                  }
                >
                  <PlayVideoIcon fill="black" /> Watch Now
                </button>
              </div>
              <div className="hidden lg:block lg:w-1/2 text-left pl-8">
                <h1 className="text-[60px] font-bold text-white mb-4">
                  {movie.Title}
                </h1>
                <div className="flex">
                  <StarIcon />
                  <p className="text-[30px] font-bold mb-4 text-white">
                    {movie.rating}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default MovieSlider;