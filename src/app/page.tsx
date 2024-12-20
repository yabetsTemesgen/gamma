import FeaturedMovies from '@/components/FeaturedMovies'
import RecentMovies from '@/components/RecentMovies'
import BoxOffice from '@/components/BoxOffice'
import { fetchBoxOfficeMovies, fetchRecentMovies } from '@/services/movieService'
import { Movie } from '@/types/movie'

const Page = async () => {
  let recentMovies: Movie[] = [];
  let boxOfficeMovies: Movie[] = [];

  try {
    recentMovies = await fetchRecentMovies();
    boxOfficeMovies = await fetchBoxOfficeMovies();
  } catch (error) {
    console.log(`Failed to fetch movies. ${error}`);
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <FeaturedMovies/>
      <RecentMovies movies={recentMovies}/>
      <BoxOffice movies={boxOfficeMovies}/>
    </div>
  )
}

export default Page
