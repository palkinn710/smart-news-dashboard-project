import InfiniteScrollList from "../components/InfiniteScrollList.jsx";
import { useBookmarks } from "../context/BookmarkContext.jsx";

export default function Bookmarks() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="page-shell space-y-6 animate-fade-in">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">CRUD with localStorage</p>
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Saved Articles</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Add, view, and remove bookmarks from any article card.
        </p>
      </div>
      <InfiniteScrollList articles={bookmarks} loading={false} hasMore={false} onLoadMore={() => {}} />
    </div>
  );
}
