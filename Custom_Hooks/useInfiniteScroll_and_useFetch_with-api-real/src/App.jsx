import React, { useEffect, useRef, useState } from "react";
import useFetch from "./useFetch";
import useInfiniteScroll from "./useInfiniteScroll";

function App() {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef();
  const { data, error, loading } = useFetch(
    `https://dummyjson.com/users?limit=10&skip=${
      page * 10
    }&select=firstName,age`
  );

  const incrementPage = () => {
    setPage((prev) => prev + 1);
  };

  useInfiniteScroll(containerRef, incrementPage, loading, hasMore);

  useEffect(() => {
    if (data && data.users.length === 0) {
      setHasMore(false);
    }
    if (data && data.users.length > 0) {
      const newItems = page === 0 ? [...data.users] : [...items, ...data.users];
      setItems(newItems);
    }
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "500px",
        height: "500px",
        border: "1px solid black",
        overflowY: "auto",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            width: "100%",
            height: "80px",
            backgroundColor: "beige",
            marginBottom: "10px",
            border: "1px solid black",
          }}
        >
          <h3>Name: {item.firstName}</h3>
          <p>Age: {item.age}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
