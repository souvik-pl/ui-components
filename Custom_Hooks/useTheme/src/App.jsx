import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme should be used inside ThemeProvider");
  return context;
};

function Navbar() {
  const { toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}

function Body() {
  const { isDark } = useTheme();

  return (
    <div>
      <p>{isDark ? "Dark" : "Light"}</p>
    </div>
  );
}

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const savedValue = localStorage.getItem("isDark");
    if (savedValue) {
      return JSON.parse(savedValue);
    }

    return false;
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem("isDark", JSON.stringify(!isDark));
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <Body />
      </div>
    </ThemeProvider>
  );
}

export default App;
