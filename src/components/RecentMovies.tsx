"use client"
import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import MovieLoader from "./common/MovieLoader";

interface RecentMoviesProps {
  movies: Movie[];
}

const RecentMovies = ({ movies }: RecentMoviesProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movies.length > 0) {
      setLoading(false);
    }
  }, [movies]);

  return <MovieLoader movies={movies} title="Recent Movies" loading={loading} />;
};

export default RecentMovies;