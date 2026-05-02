import axios from "axios";

const API_KEY = "aaf78e13c5764958b1aa8c8d29f20418";

export const fetchNews = async () => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return { articles: [] };
  }
};