import React from "react";

function MenuItem({ children }) {
  return (
    <a
      style={{
        padding: "5px",
        cursor: "pointer",
      }}
    >
      {children}
    </a>
  );
}

export default MenuItem;
