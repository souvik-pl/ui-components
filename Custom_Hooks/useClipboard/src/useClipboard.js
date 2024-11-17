import { useCallback, useState } from "react";

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  const copyToClipboard = useCallback(async (text) => {
    try {
      if (!navigator.clipboard.writeText) {
        throw new Error("Browser does not support clipboard");
      }

      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsCopied(false);
    }
  }, []);

  return {
    isCopied,
    error,
    copyToClipboard,
  };
};

export default useClipboard;
