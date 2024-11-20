import { useEffect, useState } from "react";

const useDebounce = (query, delay) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay || 500);

    return () => clearTimeout(timer);
  }, [query]);

  return debouncedQuery;
};

export default useDebounce;
