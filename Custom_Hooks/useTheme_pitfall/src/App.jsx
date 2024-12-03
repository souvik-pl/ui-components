import React from "react";
import useTheme from "./useTheme";
import "./App.css";

// When Comp renders, it uses its own instance of useAuth. The changes in theme
// from App's useTheme instance are not reflected in Comp's useTheme instance because they are separate.
// To solve this problem, we need to use Context API
function Comp() {
  const { theme } = useTheme();
  return <p>Theme: {theme}</p>;
}

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>Toggle theme</button>
      <div className="text">Hello world</div>
      <Comp />
    </div>
  );
}

export default App;
