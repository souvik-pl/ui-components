import React, { useState } from "react";

function FloatingActionButton({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      style={{ display: "flex", gap: "20px", width: "max-content" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <button style={{ fontSize: "20px", width: "30px", height: "30px" }}>
        {isExpanded ? "X" : "+"}
      </button>
      {isExpanded && children}
    </div>
  );
}

export default FloatingActionButton;
