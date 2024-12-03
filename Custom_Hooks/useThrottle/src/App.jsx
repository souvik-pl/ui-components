import React, { useEffect, useState } from "react";
import useThrottle from "./useThrottle";

function App() {
  const [searchQuery, setSearchQuery] = useState();
  const throttledQuery = useThrottle(searchQuery, 800);

  useEffect(() => {
    if (!throttledQuery) return; // if no query, don't fetch data
    fetchData(throttledQuery);
  }, [throttledQuery]);

  const fetchData = async (query) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const inputHandler = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
  };

  return (
    <div>
      <input type="text" onKeyUp={inputHandler} />
    </div>
  );
}

export default App;
