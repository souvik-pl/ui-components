import React, { useState } from "react";
import useUpdateEffect from "./useUpdateEffect";

// create a useUpdateEffect custom hook that will just work like useEffect,
// but it won't run on first render. It will run only when dependencies changes.

// Comment out StrictMode in main.jsx file. Otherwise, it won't work as expected.

function App() {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    console.log("Value updated");
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>{count}</p>
    </div>
  );
}

export default App;
