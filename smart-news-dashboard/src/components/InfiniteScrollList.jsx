import NewsCard from "./NewsCard.jsx";
import Loader from "./Loader.jsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.js";

export default function InfiniteScrollList({ articles, loading, hasMore, onLoadMore }) {
  const lastItemRef = useInfiniteScroll({ hasMore, loading, onLoadMore });

  if (!loading && articles.length === 0) {
    return (
      <div className="glass rounded-lg p-10 text-center text-slate-600 dark:text-slate-300">
        No articles match the current filters.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <div key={`${article.id}-${index}`} ref={index === articles.length - 1 ? lastItemRef : null}>
            <NewsCard article={article} />
          </div>
        ))}
      </div>
      {loading && <Loader />}
      {!hasMore && articles.length > 0 && (
        <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
          You are all caught up.
        </p>
      )}
    </>
  );
}
