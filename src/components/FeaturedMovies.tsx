"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchBoxOfficeMovies } from "@/services/movieService";
import { Movie } from "@/types/movie";
import { useRouter } from "next/navigation";
import { FeatureShimmer } from "./common/Shimmers";
import MovieSlider from "@/components/common/MovieSlider";

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
    router.push(
      `/player?videoUrl=${encodeURIComponent(videoUrl)}&coverImgUrl=${encodeURIComponent(
        coverImgUrl
      )}&title=${encodeURIComponent(Title)}`
    );
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
    <div className="text-center h-[674px] w-full mx-auto mb-32 lg:mb-28 lg:p-7">
      {movies.length > 0 ? (
        <MovieSlider
          movies={movies}
          settings={settings}
          isValidImageUrl={isValidImageUrl}
          handleWatchNow={handleWatchNow}
        />
      ) : (
        <div className="space-y-8">
          <FeatureShimmer />
        </div>
      )}
    </div>
  );
};

export default FeaturedMovies;