import { useState } from "react";


const getPaginationNumbers = (page, totalPages, maxVisible) => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }


  const half = Math.floor(maxVisible / 2);
  let start = page - half;
  let end = page + half;


  if (start < 1) {
    start = 1;
    end = maxVisible;
  } else if (end > totalPages) {
    end = totalPages;
    start = end - maxVisible + 1;
  }


  return Array.from({ length: maxVisible }, (_, i) => start + i);
};


const Pagination = ({ page, totalPages, setPage }) => {
  const maxButtonCount = 5;
  const pageRange = getPaginationNumbers(page, totalPages, maxButtonCount);


  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };


  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };


  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <button onClick={() => setPage(1)} disabled={page === 1}>
        &lt;&lt;
      </button>
      <button onClick={handlePrev} disabled={page === 1}>
        &lt;
      </button>
      {pageRange[0] > 1 && <span>...</span>}
      {pageRange.map((p) => (
        <button
          key={p}
          style={{
            backgroundColor: p === page ? "white" : "",
          }}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
      {pageRange[pageRange.length - 1] < totalPages && <span>...</span>}
      <button onClick={handleNext} disabled={page === totalPages}>
        &gt;
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
};


function App() {
  const [page, setPage] = useState(1);


  return <Pagination page={page} setPage={setPage} totalPages={10} />;
}


export default App;
