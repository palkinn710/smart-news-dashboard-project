import { useCallback, useEffect, useMemo, useState } from "react";
import { Bookmark, Clock, Newspaper } from "lucide-react";
import CategoryTabs from "../components/CategoryTabs.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import FeaturedNews from "../components/FeaturedNews.jsx";
import FilterPanel from "../components/FilterPanel.jsx";
import InfiniteScrollList from "../components/InfiniteScrollList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useBookmarks } from "../context/BookmarkContext.jsx";
import { useNews } from "../context/NewsContext.jsx";
import { useDebounce } from "../hooks/useDebounce.js";
import { useFetchNews } from "../hooks/useFetchNews.js";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "general", sortBy: "newest", source: "" });
  const debouncedSearch = useDebounce(search, 500);
  const requestFilters = useMemo(
    () => ({ ...filters, query: debouncedSearch }),
    [debouncedSearch, filters],
  );
  const { articles, loading, error, hasMore, loadMore, retry, total } = useFetchNews(requestFilters);
  const { rememberArticles } = useNews();
  const { bookmarks } = useBookmarks();

  useEffect(() => {
    rememberArticles(articles);
  }, [articles, rememberArticles]);

  const sources = useMemo(() => Array.from(new Set(articles.map((article) => article.source))).sort(), [articles]);
  const suggestions = useMemo(
    () => articles.filter((article) => article.title.toLowerCase().includes(search.toLowerCase())),
    [articles, search],
  );
  const updateFilters = useCallback((patch) => setFilters((current) => ({ ...current, ...patch })), []);
  const topSource = sources[0] || "Curated desk";

  return (
    <div className="page-shell space-y-7 animate-fade-in">
      <section className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(8,145,178,0.18),transparent_42%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
              Today's Briefing
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl">
              Fresh headlines, sorted for quick reading.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Search live stories, jump through categories, filter sources, and keep your saved reads in one tidy dashboard.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: "Articles", value: total, icon: Newspaper },
              { label: "Saved", value: bookmarks.length, icon: Bookmark },
              { label: "Top source", value: topSource, icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <Icon size={16} />
                  {label}
                </div>
                <div className="truncate text-2xl font-black text-slate-950 dark:text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <SearchBar value={search} onChange={setSearch} suggestions={suggestions} onSuggestionClick={setSearch} />
        <CategoryTabs />
      </section>

      <FilterPanel filters={filters} onChange={updateFilters} sources={sources} />

      {error ? (
        <ErrorMessage message={error} onRetry={retry} />
      ) : (
        <>
          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Editor picks</p>
                <h2 className="text-2xl font-black text-slate-950 dark:text-white">Trending News</h2>
              </div>
            </div>
            <FeaturedNews articles={articles.slice(0, 4)} />
          </section>
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Continuous feed</p>
                <h2 className="text-2xl font-black text-slate-950 dark:text-white">Latest Headlines</h2>
              </div>
            </div>
            <InfiniteScrollList articles={articles} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
          </section>
        </>
      )}
    </div>
  );
}
