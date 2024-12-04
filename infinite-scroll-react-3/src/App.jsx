import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import useFetch from "./useFetch";

function App() {
  const [skip, setSkip] = useState(0);
  const [items, setItems] = useState([]);

  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products?select=title,price&limit=2&skip=${skip * 2}`
  );

  const onPageEnd = () => {
    setSkip((prevSkip) => prevSkip + 1);
  };

  useEffect(() => {
    if (data) {
      setItems([...items, ...data.products]);
    }
  }, [data]);

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
