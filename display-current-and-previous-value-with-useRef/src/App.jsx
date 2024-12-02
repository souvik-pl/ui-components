import React, { useEffect, useRef, useState } from "react";

function App() {
  const [data, setData] = useState("");
  const prevDataState = useRef("");

  useEffect(() => {
    prevDataState.current = data;
  }, [data]);

  return (
    <div>
      <input value={data} onChange={(e) => setData(e.target.value)} />
      <p>Previous Data state: {prevDataState.current}</p>
    </div>
  );
}

export default App;
