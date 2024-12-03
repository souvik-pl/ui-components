import { useRef, useState } from "react";

export const useThrottle = (callback, delay) => {
  const [isInvokeCallbackAllowed, setIsInvokeCallbackAllowed] = useState(true);

  const handler = () => {
    if (!isInvokeCallbackAllowed) return;
    setIsInvokeCallbackAllowed(false);

    setTimeout(() => {
      callback();
      setIsInvokeCallbackAllowed(true);
    }, delay || 400);
  };

  return handler;
};
