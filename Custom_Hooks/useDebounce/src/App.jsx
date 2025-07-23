import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

function App() {
  const [searchQuery, setSearchQuery] = useState();
  const debouncedQuery = useDebounce(searchQuery, 600);

  useEffect(() => {
    if (!debouncedQuery) return; // if no query, don't fetch data
    fetchData(debouncedQuery);
  }, [debouncedQuery]);

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
