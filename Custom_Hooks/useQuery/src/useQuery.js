import { useCallback, useEffect, useState } from "react";

export const useQuery = ({ queryKey, queryFn }) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = useCallback(
    async (isRefetch = false) => {
      try {
        if (!isRefetch) setIsLoading(true);
        else setIsRefetching(true);
        setIsError(false);
        setError(null);

        const response = await queryFn();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setIsError(true);
        setError(error);
      } finally {
        setIsLoading(false);
        setIsRefetching(false);
      }
    },
    [queryFn]
  );

  useEffect(() => {
    fetchData();
  }, [...queryKey]);

  const refetch = () => {
    fetchData(true);
  };

  return {
    data,
    isLoading,
    isError,
    error,
    isRefetching,
    refetch,
  };
};
