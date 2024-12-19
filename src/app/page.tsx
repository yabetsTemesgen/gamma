"use client"
import { useEffect, useState } from 'react'
import FeaturedMovies from '@/components/FeaturedMovies'
import RecentMovies from '@/components/RecentMovies'
import BoxOffice from '@/components/BoxOffice'
import { fetchBoxOfficeMovies, fetchRecentMovies } from '@/services/movieService'
import { Movie } from '@/types/movie'
const page = () => {
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  const [boxOfficeMovies, setBoxOfficeMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const getMovies = async () => {
      const recentMoviesData = await fetchRecentMovies();
      const boxOfficeMoviesData = await fetchBoxOfficeMovies();
      setBoxOfficeMovies(boxOfficeMoviesData);
      setRecentMovies(recentMoviesData);
    };

    getMovies();
  }, []);
  return (
    <div className="bg-black text-white min-h-screen">
      <FeaturedMovies/>
      <RecentMovies movies={recentMovies}/>
      <BoxOffice movies={boxOfficeMovies}/>
    </div>
  )
}

export default page