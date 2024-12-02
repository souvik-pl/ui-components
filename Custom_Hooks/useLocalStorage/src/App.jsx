import React from "react";
import { useLocalStorage } from "./useLocalStorage";

// create a useLocalStorage custom hook that will just work like useState.

function App() {
  const [value, setValue] = useLocalStorage("user", "hi");
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>{value}</p>
    </div>
  );
}

export default App;
