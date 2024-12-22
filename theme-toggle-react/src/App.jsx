import React from "react";
import ThemeProvider from "./Theme/ThemeProvider";
import Nav from "./components/Nav";
import Body from "./components/Body";

function App() {
  return (
    <ThemeProvider>
      <Nav />
      <Body />
    </ThemeProvider>
  );
}

export default App;
