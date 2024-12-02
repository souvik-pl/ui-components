import { useEffect, useRef } from "react";

const useUpdateEffect = (callback, dependencyArr) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      return;
    }
    return callback(); // . We are calling the callback in the body of the useEffect and then if the callback returns anything (such as a clean up function) we are making sure to return that to our useEffect. This ensures the useEffect works as expected for return values.
  }, dependencyArr);
};

export default useUpdateEffect;
