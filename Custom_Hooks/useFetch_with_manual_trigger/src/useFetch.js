import React, { useCallback, useEffect, useState, useRef } from "react";

const useFetch = (url, manualTrigger = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    // Abort any ongoing request before starting a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
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
  }, [url]);

  useEffect(() => {
    if (manualTrigger === false) {
      fetchData();
    } else if (shouldFetch) {
      fetchData();
      setShouldFetch(false);
    }
  }, [shouldFetch, fetchData]);

  const manualFetch = () => {
    setShouldFetch(true);
  };

  return {
    data,
    loading,
    error,
    manualFetch,
  };
};

export default useFetch;
