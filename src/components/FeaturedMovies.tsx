"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchBoxOfficeMovies } from "@/services/movieService";
import { Movie } from "@/types/movie";
import StarIcon from "./icons/StarIcon";
import PlayIcon from "./icons/PlayIcon";
import interstellar from "@/assets/images/interstellar.jpg";
import inception from "@/assets/images/inception.jpg";

const FeaturedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  // Function to check if URL is valid
  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    if (url.includes("example.com")) return false;
    return true;
  };

  // Fetch box office movies
  useEffect(() => {
    const getMovies = async () => {
      const boxOfficeMovies = await fetchBoxOfficeMovies();
      setMovies(boxOfficeMovies);
    };

    getMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <div className="text-center h-[674px] w-full mx-auto mb-28 lg:p-7">
      {movies.length > 0 ? (
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div key={index} className="relative mb-8 overflow-hidden">
              {/* Background Blur Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center z-0 bg-gradient-to-r from-black/87 to-black/54"
                style={{
                  backgroundImage: `url(${
                    isValidImageUrl(movie.cover_img_url || "")
                      ? movie.cover_img_url
                      : movie.Title === "Interstellar"
                      ? interstellar.src
                      : inception.src
                  })`,
                  filter: "blur(49px)",
                  WebkitFilter: "blur(49px)",
                }}
              />
              {/* Content Container */}
              <div className="relative z-10 flex p-8">
                <div className="flex flex-col lg:flex-row items-center w-full max-w-5xl lg:gap-9">
                  <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
                    <Image
                      src={
                        isValidImageUrl(movie.cover_img_url || "")
                          ? (movie.cover_img_url as string)
                          : movie.Title === "Interstellar"
                          ? interstellar
                          : inception
                      }
                      alt={movie.Title || "Movie Cover Image"}
                      width={1000}
                      height={1000}
                      className="w-full max-w-[400px] lg:max-w-none lg:h-[590px] rounded-[27px] object-cover"
                      onError={(e) => {
                        // Fallback to appropriate image if the image fails to load
                        const imgElement = e.target as HTMLImageElement;
                        imgElement.src =
                          movie.Title === "Inception"
                            ? inception.src
                            : interstellar.src;
                      }}
                    />
                    <button className="bg-white w-full py-3 px-4 rounded-md text-black md:hidden mt-4 flex items-center justify-center">
                      <PlayIcon /> Watch Now
                    </button>
                  </div>
                  <div className="hidden lg:block lg:w-1/2 text-left pl-8">
                    <h1 className="text-[60px] font-bold text-white mb-4">
                      {movie.Title}
                    </h1>
                    <div className="flex">
                      <StarIcon />
                      <p className="text-[30px] font-bold mb-4 text-white">
                        {" "}
                        {movie.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-white text-lg">Loading movies...</p>
      )}
    </div>
  );
};

export default FeaturedMovies;