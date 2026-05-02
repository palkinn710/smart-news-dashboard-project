import { apiConfig, newsClient } from "../api/newsClient.js";
import { mockArticles } from "./mockNews.js";
import { PAGE_SIZE } from "../utils/constants.js";
import { normalizeArticle } from "../utils/article.js";

const sortMap = {
  newest: "publishedAt",
  popularity: "relevancy",
};

const sliceMock = ({ page = 1, category = "general", query = "", source = "" }) => {
  const search = query.toLowerCase();
  const filtered = mockArticles.filter((article) => {
    const matchesCategory = category === "general" || article.category === category;
    const matchesQuery = !search || article.title.toLowerCase().includes(search);
    const matchesSource = !source || article.source.name === source;
    return matchesCategory && matchesQuery && matchesSource;
  });
  return {
    articles: filtered
      .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
      .map((article) => normalizeArticle(article, article.category)),
    totalArticles: filtered.length,
  };
};

export const fetchNews = async ({
  category = "general",
  query = "",
  page = 1,
  sortBy = "newest",
  source = "",
} = {}) => {
  if (!apiConfig.hasKey) {
    return sliceMock({ page, category, query, source });
  }

  const isNewsApi = apiConfig.provider === "newsapi";
  const params = isNewsApi
    ? {
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
        q: query || category,
        category: query ? undefined : category === "general" ? undefined : category,
        page,
        pageSize: PAGE_SIZE,
        sortBy: sortMap[sortBy] || "publishedAt",
        sources: source || undefined,
        language: "en",
      }
    : {
        apikey: import.meta.env.VITE_GNEWS_API_KEY,
        q: query || category,
        category: query ? undefined : category === "general" ? undefined : category,
        page,
        max: PAGE_SIZE,
        lang: "en",
      };

  const endpoint = isNewsApi ? (query ? "/everything" : "/top-headlines") : query ? "/search" : "/top-headlines";
  const { data } = await newsClient.get(endpoint, { params });
  const rawArticles = data.articles || [];
  const normalized = rawArticles.map((article) => normalizeArticle(article, category));

  return {
    articles: normalized.filter((article) => !source || article.source === source),
    totalArticles: data.totalArticles || data.totalArticlesCount || normalized.length,
  };
};
