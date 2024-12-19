import { Movie } from "@/types/movie";
  
  interface BoxOfficeProps {
    movies: Movie[];
  }
  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    if (url.includes("example.com")) return false;
    return true;
};
  import inception from "@/assets/images/inception.jpg";
  import interstellar from "@/assets/images/interstellar.jpg";
  const BoxOffice = ({ movies }: BoxOfficeProps) => {
    return (
        <div className="flex justify-center">
        <div className="flex flex-col gap-4 items-start">
            <h2 className="text-2xl font-bold ml-5 lg:ml-2">Box office</h2>
            <div className="flex gap-4 overflow-x-auto px-2 max-w-sm lg:max-w-lg remove-scrollbars">
            {movies.map((movie, index) => (
                <div key={index} className="min-w-[150px]">
                <img
                    src={
                        isValidImageUrl(movie.cover_img_url || "")
                          ? (movie.cover_img_url as string)
                          : movie.Title === "Interstellar"
                          ? interstellar.src
                          : inception.src
                      }
                    alt={movie.Title}
                    className="mb-2 w-[148.5px] h-[220px] rounded-[14px]"
                />
                <p className="text-center text-sm">{movie.Title}</p>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
  };
  
  export default BoxOffice;
