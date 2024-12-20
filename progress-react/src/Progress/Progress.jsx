import React, { useEffect } from "react";

function Progress({ value, max }) {
  const percent = (value / max) * 100;
  return (
    <div
      style={{
        width: "400px",
        height: "40px",
        border: "1px solid black",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          height: "40px",
          width: "400px",
          backgroundColor: "green",
          transform: `translateX(${percent - 100}%)`,
          zIndex: -1,
        }}
      ></div>
      <div
        style={{
          color: percent < 50 ? "black" : "white",
        }}
      >
        {percent} %
      </div>
    </div>
  );
}

export default Progress;
