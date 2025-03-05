import React, { useState } from "react";
import { useQuery } from "./useQuery";
import { getData } from "./data.api";

function App() {
  const [userId, setUserId] = useState(1);
  const { data, isLoading, isError, error, isRefetching, refetch } = useQuery({
    queryKey: ["getUser", userId],
    queryFn: () => getData(userId),
  });

  return (
    <div>
      <h3>User {userId}</h3>
      <div style={{ height: "150px" }}>
        {(isLoading || isRefetching) && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        {!isLoading && !isRefetching && !isError && (
          <code>{JSON.stringify(data, null, 4)}</code>
        )}
      </div>
      <button onClick={() => setUserId((prev) => prev + 1)}>Next user</button>
      <br />
      <button onClick={refetch}>Refetch current user</button>
    </div>
  );
}

export default App;
