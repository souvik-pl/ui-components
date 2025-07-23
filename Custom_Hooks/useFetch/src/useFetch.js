import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        // if this check is not applied then it will set the value of error using 'setError'
        if (error.name !== "AbortError") {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel fetch request if the component unmounts or URL changes
    return () => controller.abort();
  }, [url]);
  // we need 'url' as dependency because - If the url prop changes
  // dynamically (e.g., based on user input or application state),
  // including it in the dependency array ensures the hook re-fetches
  // data when the url updates. Without it, the useEffect won't
  // re-run, and the new data won't be fetched.
  // const { data, loading, error } = useFetch(`https://api.example.com/items?query=${searchTerm}`);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
