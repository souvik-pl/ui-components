import { useEffect } from "react";

const useInfiniteScroll = (containerRef, callback, isLoading, hasMore) => {
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      const scrollHeight = e.target.scrollHeight;
      const clientHeight = e.target.clientHeight;

      if (
        scrollHeight - scrollTop < clientHeight + 100 &&
        !isLoading &&
        hasMore
      ) {
        callback();
      }
    };

    containerRef.current.addEventListener("scroll", handleScroll);

    return () =>
      containerRef.current.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);
};

export default useInfiniteScroll;
