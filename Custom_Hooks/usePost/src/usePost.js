import { useCallback, useRef, useState } from "react";

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortController = useRef();

  const sendPostRequest = useCallback(
    async function (body) {
      if (abortController.current) {
        abortController.current.abort();
      }

      const controller = new AbortController();
      abortController.current = controller;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return {
    data,
    error,
    loading,
    sendPostRequest,
  };
};

export default usePost;
