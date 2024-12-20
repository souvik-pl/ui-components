import React from "react";

function Tab({ label, value }) {
  return (
    <div
      style={{
        padding: "7px",
        cursor: "pointer",
      }}
    >
      {label}
    </div>
  );
}

export default Tab;
