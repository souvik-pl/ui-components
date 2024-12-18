import React from "react";
import { DOTS, usePagination } from "./usePagination";

function Pagination({ totalPages, currentPage, onChange }) {
  const paginationUIElements = usePagination(currentPage, totalPages);

  const handlePageClick = (page) => {
    onChange(page);
  };

  const prevHandler = () => {
    if (currentPage - 1 > 0) {
      onChange(currentPage - 1);
    }
  };

  const nextHandler = () => {
    if (currentPage + 1 <= totalPages) {
      onChange(currentPage + 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <button
        style={{
          padding: "10px",
        }}
        onClick={prevHandler}
      >
        &lt;
      </button>
      {paginationUIElements.map((item, index) => {
        if (item === DOTS) {
          return <span key={index}>{DOTS}</span>;
        }

        return (
          <button
            key={index}
            style={{
              padding: "10px",
              border: item === currentPage ? "2px solid black" : "",
            }}
            onClick={() => handlePageClick(item)}
          >
            {item}
          </button>
        );
      })}
      <button
        style={{
          padding: "10px",
        }}
        onClick={nextHandler}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
