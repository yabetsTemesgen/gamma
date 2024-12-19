import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch movie by name
export const fetchMainMovie = async (name: string) => {
    const response = await axios.get(`${API_BASE_URL}/filter-movie?name=${name}`);
    return response.data;
};

// Fetch recent movies
export const fetchRecentMovies = async () => {
    const response = await axios.get(`${API_BASE_URL}/recent-movies`);
    return response.data;
};

// Fetch box office movies
export const fetchBoxOfficeMovies = async () => {
    const response = await axios.get(`${API_BASE_URL}/box-office-movies`);
    return response.data;
};
