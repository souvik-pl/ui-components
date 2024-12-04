import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";

function App() {
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const fetchData = async (skip) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?select=title,price&limit=2&skip=${
          skip * 2
        }`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems([...items, ...data.products]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(skip);
  }, [skip]);

  const onPageEnd = () => {
    setSkip((prevSkip) => prevSkip + 1);
  };

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        border: "1px solid black",
      }}
    >
      <InfiniteScroll loading={loading} onPageEnd={onPageEnd}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              width: "100%",
              height: "100px",
              backgroundColor: "beige",
              border: "1px solid black",
            }}
          >
            <h2>Title: {item.title}</h2>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
