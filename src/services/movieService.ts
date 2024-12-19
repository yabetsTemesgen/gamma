import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch movie by name
export const fetchMainMovie = async (name: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter-movie?name=${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching main movie:", error);
    return null;
  }
};

// Fetch recent movies
export const fetchRecentMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recent-movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recent movies:", error);
    return [];
  }
};

// Fetch box office movies
export const fetchBoxOfficeMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/box-office-movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching box office movies:", error);
    return [];
  }
};
