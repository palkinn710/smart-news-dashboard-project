/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const NewsContext = createContext(null);

export function NewsProvider({ children }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);

  const rememberArticles = useCallback((articles) => {
    setRecentArticles((current) => {
      const merged = [...articles, ...current];
      const next = Array.from(new Map(merged.map((article) => [article.id, article])).values()).slice(0, 60);
      return next.map((article) => article.id).join("|") === current.map((article) => article.id).join("|")
        ? current
        : next;
    });
  }, []);

  const value = useMemo(
    () => ({ selectedArticle, setSelectedArticle, recentArticles, rememberArticles }),
    [recentArticles, rememberArticles, selectedArticle],
  );

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export const useNews = () => useContext(NewsContext);
