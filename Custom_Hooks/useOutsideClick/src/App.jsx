import React, { useRef } from "react";
import useOutsideClick from "./useOutsideClick";

function App() {
  const ref = useRef();

  const handleOutsideClick = () => {
    console.log("Clicked outside");
  };

  useOutsideClick(ref, handleOutsideClick);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={ref}
        style={{
          width: "500px",
          height: "500px",
          backgroundColor: "beige",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Content
      </div>
    </div>
  );
}

export default App;
