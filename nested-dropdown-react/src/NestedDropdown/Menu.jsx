import React from "react";

function Menu({ children }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "100%",
        width: "150px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      {children}
    </div>
  );
}

export default Menu;
