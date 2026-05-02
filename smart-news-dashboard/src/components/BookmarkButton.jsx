import { Bookmark } from "lucide-react";
import { useBookmarks } from "../context/BookmarkContext.jsx";

export default function BookmarkButton({ article }) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const saved = isBookmarked(article.id);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        saved ? removeBookmark(article.id) : addBookmark(article);
      }}
      className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
        saved
          ? "border-cyan-500 bg-cyan-500 text-white"
          : "border-slate-200 bg-white/80 text-slate-600 hover:border-cyan-400 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300"
      }`}
      aria-label={saved ? "Remove bookmark" : "Add bookmark"}
      title={saved ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
