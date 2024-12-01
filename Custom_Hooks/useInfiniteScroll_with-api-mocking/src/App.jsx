import React, { useRef, useState } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const ref = useRef();

  async function fetchData() {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newItems =
      items.length < 100
        ? Array.from({ length: 10 }, (_, i) => items.length + i + 1)
        : [];
    setItems([...items, ...newItems]);
    if (newItems.length === 0) setHasMore(false);
  }

  const { isFetching } = useInfiniteScroll(ref, fetchData, hasMore);

  return (
    <div
      ref={ref}
      style={{
        width: "500px",
        height: "500px",
        border: "1px solid black",
        overflowY: "auto",
      }}
    >
      {items.map((item) => (
        <div
          key={item}
          style={{
            width: "100%",
            height: "80px",
            backgroundColor: "beige",
            marginBottom: "10px",
            border: "1px solid black",
          }}
        >
          {item}
        </div>
      ))}
      {isFetching && <p>Loading...</p>}
    </div>
  );
}

export default App;
