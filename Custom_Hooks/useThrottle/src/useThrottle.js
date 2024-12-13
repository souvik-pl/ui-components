import { useEffect, useState } from "react";

/**
 * Can be done like this as well 👇
 */

// const useThrottle = (input, delay) => {
//   const [value, setValue] = useState(input);
//   const isAllowed = useRef(true);

//   useEffect(() => {
//     if (isAllowed.current) {
//       setValue(input);
//       isAllowed.current = false;
//       setTimeout(() => {
//         isAllowed.current = true;
//       }, delay || 400);
//     }
//   }, [input]);

//   return value;
// };

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
