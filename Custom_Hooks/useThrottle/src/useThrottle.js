import { useEffect, useState } from "react";

const useThrottle = (query, delay) => {
  const [throttledQuery, setThrottledQuery] = useState("");
  const [isQuerySettingAllowed, setIsQuerySettingAllowed] = useState(true);

  useEffect(() => {
    if (isQuerySettingAllowed) {
      setThrottledQuery(query);
      setIsQuerySettingAllowed(false);
      setTimeout(() => {
        setIsQuerySettingAllowed(true);
      }, delay || 500);
    }
  }, [query]);

  return throttledQuery;
};

export default useThrottle;
