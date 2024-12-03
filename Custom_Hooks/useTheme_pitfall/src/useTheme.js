import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? storedTheme : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;
