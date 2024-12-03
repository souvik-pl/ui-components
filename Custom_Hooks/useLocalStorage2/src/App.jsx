import React from "react";
import { useLocalStorage } from "./useLocalStorage";

// create a useLocalStorage custom hook that will just work like useState and also has remove method.

function App() {
  const [value, setValue, removeValue] = useLocalStorage("user", "maverick");

  return (
    <div>
      <input value={value || ""} onChange={(e) => setValue(e.target.value)} />
      <button onClick={removeValue}>Clear</button>
      <p>{value}</p>
    </div>
  );
}

export default App;
