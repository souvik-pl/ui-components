import { useCallback } from "react";
import { useState } from "react";

export const usePost = ({ url, onSuccess, onError }) => {
  const [isPending, setIsPending] = useState(false);

  const sendRequest = useCallback(
    async (body) => {
      setIsPending(true);

      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        onSuccess(data);
      } catch (error) {
        onError(error);
      } finally {
        setIsPending(false);
      }
    },
    [url]
  );

  return {
    sendRequest,
    isPending,
  };
};
