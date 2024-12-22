import { createContext, useContext } from "react";

export const ThemeContext = createContext(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within ThemeProvider component"
    );
  }

  return context;
};
