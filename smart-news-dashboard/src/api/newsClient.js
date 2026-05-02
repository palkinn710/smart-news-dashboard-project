import axios from "axios";

const provider = import.meta.env.VITE_NEWS_PROVIDER || "gnews";

export const apiConfig = {
  provider,
  hasKey:
    provider === "newsapi"
      ? Boolean(import.meta.env.VITE_NEWS_API_KEY)
      : Boolean(import.meta.env.VITE_GNEWS_API_KEY),
};

export const newsClient = axios.create({
  baseURL:
    provider === "newsapi"
      ? "https://newsapi.org/v2"
      : "https://gnews.io/api/v4",
  timeout: 10000,
});
