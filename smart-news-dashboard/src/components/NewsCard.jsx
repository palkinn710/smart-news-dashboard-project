import { memo } from "react";
import { Link } from "react-router-dom";
import BookmarkButton from "./BookmarkButton.jsx";
import { useNews } from "../context/NewsContext.jsx";
import { formatDate, titleCase } from "../utils/formatters.js";
import { getReadingMinutes } from "../utils/article.js";

function NewsCard({ article, featured = false }) {
  const { setSelectedArticle } = useNews();

  return (
    <article className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      <Link
        to={`/article/${article.id}`}
        onClick={() => setSelectedArticle(article)}
        className="block h-full"
      >
        <div className={`${featured ? "aspect-[16/8]" : "aspect-[16/10]"} bg-slate-100 dark:bg-slate-800`}>
          <img
            src={article.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-3 p-5 text-left">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
            <span>{titleCase(article.category)}</span>
            <span className="h-1 w-1 rounded-full bg-slate-400" />
            <span>{article.source}</span>
          </div>
          <h3 className={`${featured ? "text-2xl" : "text-lg"} font-bold leading-tight text-slate-950 dark:text-white`}>
            {article.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {article.description}
          </p>
          <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span>{formatDate(article.publishedAt)}</span>
            <span>{getReadingMinutes(article.content)} min read</span>
          </div>
        </div>
      </Link>
      <div className="absolute right-4 top-4">
        <BookmarkButton article={article} />
      </div>
    </article>
  );
}

export default memo(NewsCard);
