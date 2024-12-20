"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchBoxOfficeMovies } from "@/services/movieService";
import { Movie } from "@/types/movie";
import StarIcon from "./icons/StarIcon";
import PlayVideoIcon from "./icons/PlayVideoIcon";
import error_image from "@/assets/images/error_image.png";
import { useRouter } from "next/navigation";
import { FeatureShimmer } from "./Shimmers";

const FeaturedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    if (url.includes("example.com")) return false;
    return true;
  };

  useEffect(() => {
    const getMovies = async () => {
      const boxOfficeMovies = await fetchBoxOfficeMovies();
      setMovies(boxOfficeMovies);
    };

    getMovies();
  }, []);

  const handleWatchNow = (videoUrl: string, coverImgUrl: string, Title: string) => {
    router.push(`/player?videoUrl=${encodeURIComponent(videoUrl)}&coverImgUrl=${encodeURIComponent(coverImgUrl)}&title=${encodeURIComponent(Title)}`);
  };

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
    <div className="text-center h-[674px] w-full mx-auto mb-14 lg:mb-28 lg:p-7">
      {movies.length > 0 ? (
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div key={index} className="relative mb-8 overflow-hidden">
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
                    <Image
                      src={
                        isValidImageUrl(movie.cover_img_url || "")
                          ? (movie.cover_img_url as string)
                          : error_image
                      }
                      alt={movie.Title || "Movie Cover Image"}
                      width={1000}
                      height={1000}
                      className="w-[120%] lg:w-full lg:max-w-none lg:h-[590px] lg:rounded-[27px] object-cover"
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement;
                        imgElement.src = error_image.src;
                      }}
                    />
                    <button
                      className=" absolute bottom-4 bg-white w-2/3 py-3 px-4 rounded-xl text-black md:hidden mt-4 flex items-center justify-center"
                      onClick={() => handleWatchNow(movie.video_url || "", movie.cover_img_url || "", movie.Title || "")}
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
      ) : (
        <div className="space-y-8">
          <FeatureShimmer />
        </div>
      )}
    </div>
  );
};

export default FeaturedMovies;
