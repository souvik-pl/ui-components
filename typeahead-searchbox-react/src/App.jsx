import React, { useEffect, useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedSearchQuery) return;

    const controller = new AbortController();

    const fetchData = async () => {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${debouncedSearchQuery}`,
        {
          signal: controller.signal,
        }
      );
      const results = await res.json();
      console.log(results);
    };

    fetchData();

    return () => controller.abort();
  }, [debouncedSearchQuery]);

  return (
    <div
      style={{
        marginTop: "100px",
        marginLeft: "100px",
      }}
    >
      <input
        type="text"
        onKeyUp={(e) => setSearchQuery(e.target.value.trim())}
      />
    </div>
  );
}

export default App;
