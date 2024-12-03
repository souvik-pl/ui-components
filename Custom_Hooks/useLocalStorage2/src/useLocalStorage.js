import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) {
      return savedValue;
    }

    if (typeof initialValue === "function") return initialValue();
    return initialValue;
  });

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  const removeValue = () => {
    setValue(undefined);
  };

  return [value, setValue, removeValue];
};
