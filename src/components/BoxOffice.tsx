"use client"
import { Movie } from "@/types/movie";
import MovieLoader from "./common/MovieLoader";
import { useEffect, useState } from "react";

interface BoxOfficeProps {
  movies: Movie[];
}

const BoxOffice = ({ movies }: BoxOfficeProps) => {
   const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (movies.length > 0) {
        setLoading(false);
      }
    }, [movies]);
  
  return <MovieLoader movies={movies} title="Box Office" loading= {loading}/>;
};

export default BoxOffice;