import React from "react";
import useOnline from "./useOnline";

function Comp() {
  const isOnline = useOnline();
  return <button disabled={!isOnline}>Call API</button>;
}

function App() {
  const isOnline = useOnline();

  return (
    <>
      <div>{isOnline ? "🟢 Online" : "🔴 Offline"}</div>
      <Comp />
    </>
  );
}

export default App;
