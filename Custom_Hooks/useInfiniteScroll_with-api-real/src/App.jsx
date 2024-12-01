import React, { useRef, useState } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const ref = useRef();

  async function fetchData() {
    try {
      const response = await fetch(
        `https://dummyjson.com/users?limit=10&skip=${
          page * 10
        }&select=firstName,age`
      );
      if (!response.ok) {
        throw new Error(`HTTP error, Status: ${response.status}`);
      }
      const data = await response.json();
      const newItems = [...items, ...data.users];
      setItems(newItems);
      if (data.users.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const { isFetching } = useInfiniteScroll(
    ref,
    fetchData,
    hasMore,
    page,
    setPage
  );

  return (
    <>
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

        {isFetching && <p>Loading...</p>}
      </div>
      <p>Total items: {items.length}</p>
    </>
  );
}

export default App;
