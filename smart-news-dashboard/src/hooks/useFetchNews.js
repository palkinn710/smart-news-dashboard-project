import { useCallback, useEffect, useState } from "react";
import { fetchNews } from "../services/newsService.js";
import { PAGE_SIZE } from "../utils/constants.js";

export function useFetchNews(filters) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadNews = useCallback(
    async (pageToLoad = 1, mode = "replace") => {
      setLoading(true);
      setError("");
      try {
        const result = await fetchNews({ ...filters, page: pageToLoad });
        setArticles((current) =>
          mode === "append" ? [...current, ...result.articles] : result.articles,
        );
        setTotal(result.totalArticles);
        setPage(pageToLoad);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unable to load news.");
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    // The hook owns the API synchronization for every filter change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNews(1, "replace");
  }, [loadNews]);

  const loadMore = useCallback(() => {
    if (!loading && articles.length < total) {
      loadNews(page + 1, "append");
    }
  }, [articles.length, loadNews, loading, page, total]);

  return {
    articles,
    loading,
    error,
    total,
    hasMore: articles.length < total && articles.length >= PAGE_SIZE,
    retry: () => loadNews(1, "replace"),
    loadMore,
  };
}
