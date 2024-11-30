import { useRef } from "react";

export const useDebounce = (callback, delay) => {
  const timerRef = useRef(null);

  const handler = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(callback, delay || 400);
  };

  return handler;
};
