/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const BookmarkContext = createContext(null);

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useLocalStorage("smart-news-bookmarks", []);

  const addBookmark = useCallback(
    (article) => setBookmarks((items) => [article, ...items.filter((item) => item.id !== article.id)]),
    [setBookmarks],
  );

  const removeBookmark = useCallback(
    (id) => setBookmarks((items) => items.filter((item) => item.id !== id)),
    [setBookmarks],
  );

  const isBookmarked = useCallback(
    (id) => bookmarks.some((article) => article.id === id),
    [bookmarks],
  );

  const value = useMemo(
    () => ({ bookmarks, addBookmark, removeBookmark, isBookmarked }),
    [addBookmark, bookmarks, isBookmarked, removeBookmark],
  );

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}

export const useBookmarks = () => useContext(BookmarkContext);
