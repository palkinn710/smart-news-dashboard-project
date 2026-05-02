import { useCallback, useRef } from "react";

export function useInfiniteScroll({ hasMore, loading, onLoadMore }) {
  const observerRef = useRef(null);

  return useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [hasMore, loading, onLoadMore],
  );
}
