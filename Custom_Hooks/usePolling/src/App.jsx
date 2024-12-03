import React from "react";
import usePolling from "./usePolling";

function App() {
  const { data, error, isPolling, startPolling, stopPolling } = usePolling(
    "https://dummyjson.com/users/1",
    2000
  );

  return (
    <div>
      <div>
        <button onClick={startPolling} disabled={isPolling}>
          Start Polling
        </button>
        <button onClick={stopPolling} disabled={!isPolling}>
          Stop Polling
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 4)}</pre>}
    </div>
  );
}

export default App;
