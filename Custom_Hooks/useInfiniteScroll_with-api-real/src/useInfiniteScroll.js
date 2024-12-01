import { useEffect, useState } from "react";

const useInfiniteScroll = (containerRef, callback, hasMore, page, setPage) => {
  const [isFetching, setIsFetching] = useState(true);

  const invokeCallback = async () => {
    setIsFetching(true);
    await callback();
    setIsFetching(false);
    setPage(page + 1);
  };

  useEffect(() => {
    invokeCallback();
  }, []);

  useEffect(() => {
    const handleScroll = async (e) => {
      const scrollHeight = e.target.scrollHeight;
      const scrollTop = e.target.scrollTop;
      const clientHeight = e.target.clientHeight;

      if (
        scrollHeight - scrollTop <= clientHeight + 90 &&
        hasMore &&
        !isFetching
      ) {
        invokeCallback();
      }
    };

    containerRef.current.addEventListener("scroll", handleScroll);
    return () =>
      containerRef.current.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasMore]);

  return {
    isFetching,
  };
};

export default useInfiniteScroll;
