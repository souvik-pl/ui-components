import React from "react";
import { useDebounce } from "./useDebounce";

function App() {
  const clickHandler = () => {
    console.log("click");
  };

  const debouncedClickHandler = useDebounce(clickHandler, 500);

  return <button onClick={debouncedClickHandler}>Click</button>;
}

export default App;
