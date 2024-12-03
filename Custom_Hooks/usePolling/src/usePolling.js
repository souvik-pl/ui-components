import { useEffect, useState } from "react";

const usePolling = (url, interval) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    setData(null);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("HTTP error!");
        }
        const parsedResponse = await response.json();
        setData(parsedResponse);
      } catch (error) {
        setError(error);
      }
    };

    let timerId;

    if (isPolling) {
      timerId = setInterval(() => {
        fetchData();
      }, interval || 1500);
    }

    return () => clearInterval(timerId);
  }, [isPolling]);

  const startPolling = () => {
    setIsPolling(true);
  };

  const stopPolling = () => {
    setIsPolling(false);
  };

  return {
    data,
    error,
    isPolling,
    startPolling,
    stopPolling,
  };
};

export default usePolling;
