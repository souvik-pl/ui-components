import React, { useState } from "react";
import useFetch from "./useFetch";

function App() {
  const [postNumber, setPostNumber] = useState(1);
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={() => setPostNumber(postNumber + 1)}>Next Post</button>
      <code>
        {loading2 && <p>Loading 2...</p>}
        {error2 && <p>{error2.message}</p>}
        {data2 && !loading2 && !error2 && (
          <>
            <p>{data2.title}</p>
            <p>{data2.body}</p>
          </>
        )}
      </code>
      <hr />
      <h2>Posts</h2>

      <ul>
        {data &&
          data.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
