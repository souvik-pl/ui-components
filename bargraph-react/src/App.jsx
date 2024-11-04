import React from "react";
import Bargraph from "./Bargraph/Bargraph";

function App() {
  const data = {
    2018: 55,
    2019: 107,
    2020: 150,
    2021: 200,
    2022: 250,
    2023: 293,
    2024: 320,
    2025: 13,
    2026: 82,
    2027: 207,
  };

  return (
    <div
      style={{
        width: "700px",
        height: "500px",
        margin: "50px",
      }}
    >
      <Bargraph data={data} unit={100} />
    </div>
  );
}

export default App;
