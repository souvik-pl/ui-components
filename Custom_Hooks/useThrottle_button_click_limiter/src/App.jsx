import React from "react";
import { useThrottle } from "./useThrottle";

function App() {
  const clickHandler = () => {
    console.log("click");
  };

  const throttledClickHandler = useThrottle(clickHandler, 500);

  return <button onClick={throttledClickHandler}>Click</button>;
}

export default App;
