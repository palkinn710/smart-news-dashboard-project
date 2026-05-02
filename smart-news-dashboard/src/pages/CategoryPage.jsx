import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage.jsx";
import InfiniteScrollList from "../components/InfiniteScrollList.jsx";
import { useNews } from "../context/NewsContext.jsx";
import { useFetchNews } from "../hooks/useFetchNews.js";
import { titleCase } from "../utils/formatters.js";

export default function CategoryPage() {
  const { type } = useParams();
  const filters = useMemo(() => ({ category: type, sortBy: "newest", source: "", query: "" }), [type]);
  const { articles, loading, error, hasMore, loadMore, retry } = useFetchNews(filters);
  const { rememberArticles } = useNews();

  useEffect(() => {
    rememberArticles(articles);
  }, [articles, rememberArticles]);

  return (
    <div className="page-shell space-y-6 animate-fade-in">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Category</p>
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">{titleCase(type)} News</h1>
      </div>
      {error ? (
        <ErrorMessage message={error} onRetry={retry} />
      ) : (
        <InfiniteScrollList articles={articles} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
      )}
    </div>
  );
}
