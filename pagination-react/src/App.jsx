import React, { useState } from "react";
import Pagination from "./Pagination/Pagination";

function App() {
  const totalPages = 20;
  const [page, setPage] = useState(1);
  const changeHandler = (page) => {
    setPage(page);
  };

  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={changeHandler}
      />
    </div>
  );
}

export default App;
