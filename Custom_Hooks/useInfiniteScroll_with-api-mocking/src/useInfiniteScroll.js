import { useEffect, useState } from "react";

const useInfiniteScroll = (containerRef, fetchData, hasMore) => {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchData();
      setIsFetching(false);
    })();
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
        setIsFetching(true);
        await fetchData();
        setIsFetching(false);
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
