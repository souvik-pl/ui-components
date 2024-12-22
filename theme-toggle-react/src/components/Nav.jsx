import React from "react";
import "./Nav.css";
import { useThemeContext } from "../Theme/ThemeContext";

function Nav() {
  const { isDark, setIsDark } = useThemeContext();
  return (
    <div className="nav">
      <h2>Header</h2>
      <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
    </div>
  );
}

export default Nav;
