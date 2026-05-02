import { ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BookmarkButton from "../components/BookmarkButton.jsx";
import { useBookmarks } from "../context/BookmarkContext.jsx";
import { useNews } from "../context/NewsContext.jsx";
import { formatDate, titleCase } from "../utils/formatters.js";

export default function ArticleDetail() {
  const { id } = useParams();
  const { selectedArticle, recentArticles } = useNews();
  const { bookmarks } = useBookmarks();
  const article =
    selectedArticle?.id === id
      ? selectedArticle
      : [...recentArticles, ...bookmarks].find((item) => item.id === id);

  if (!article) {
    return (
      <div className="page-shell">
        <div className="glass rounded-lg p-10 text-center">
          <h1 className="text-2xl font-black text-slate-950 dark:text-white">Article not found</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Return to the dashboard and open the story again.</p>
          <Link className="mt-5 inline-flex rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white" to="/">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="page-shell max-w-5xl animate-fade-in">
      <div className="overflow-hidden rounded-lg bg-white shadow-soft dark:bg-slate-900">
        <img src={article.image} alt="" className="aspect-[16/8] w-full object-cover" />
        <div className="space-y-5 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
              {titleCase(article.category)} / {article.source}
            </p>
            <BookmarkButton article={article} />
          </div>
          <h1 className="text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl">{article.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            By {article.author} / {formatDate(article.publishedAt)}
          </p>
          <p className="text-lg leading-8 text-slate-700 dark:text-slate-200">{article.description}</p>
          <p className="leading-8 text-slate-600 dark:text-slate-300">{article.content}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-3 font-bold text-white dark:bg-white dark:text-slate-950"
          >
            Read original
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}
