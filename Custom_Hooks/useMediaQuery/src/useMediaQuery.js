import { useEffect, useState } from "react";

const useMediaQuery = (queryString) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(queryString);

    const updateIsMatch = () => {
      setIsMatch(mediaQueryList.matches);
    };

    updateIsMatch();

    mediaQueryList.addEventListener("change", updateIsMatch);
    return () => {
      mediaQueryList.removeEventListener("change", updateIsMatch);
    };
  }, []);

  return isMatch;
};

export default useMediaQuery;
