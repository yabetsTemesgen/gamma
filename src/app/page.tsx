"use client"
import { useEffect, useState } from 'react'
import FeaturedMovies from '@/components/FeaturedMovies'
import RecentMovies from '@/components/RecentMovies'
import { fetchRecentMovies } from '@/services/movieService'
import { Movie } from '@/types/movie'
const page = () => {
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const getMovies = async () => {
      const recentMoviesData = await fetchRecentMovies();

      setRecentMovies(recentMoviesData);
    };

    getMovies();
  }, []);
  return (
    <div className="bg-black text-white min-h-screen">
      <FeaturedMovies/>
      <RecentMovies movies={recentMovies}/>
    </div>
  )
}

export default page