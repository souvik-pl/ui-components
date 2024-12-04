import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "./InfiniteScroll/InfiniteScroll";

function App() {
  const [skip, setSkip] = useState(0);
  const [productsList, setProductList] = useState([]);

  const fetchData = async (skip) => {
    const baseUrl = "https://dummyjson.com/products?select=title,price";
    const response = await fetch(baseUrl + `&limit=3&skip=${skip}`);
    const data = await response.json();
    setProductList([...productsList, ...data.products]);
  };

  const handlePageEnd = useCallback(() => {
    setSkip((prev) => prev + 3);
  }, []);

  useEffect(() => {
    fetchData(skip);
  }, [skip]);

  return (
    <div
      style={{
        width: "600px",
        height: "600px",
        border: "1px solid black",
        margin: "10px",
      }}
    >
      <InfiniteScroll width="100%" height="100%" onPageEnd={handlePageEnd}>
        {productsList.map((product) => (
          <div
            key={product.id}
            style={{ marginBottom: "10px", backgroundColor: "beige" }}
          >
            <h3>{product.title}</h3>
            <p>ID: {product.id}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
