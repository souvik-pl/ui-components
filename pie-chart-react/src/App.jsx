import React from "react";
import PieChart from "./PieChart/PieChart";

function App() {
  const data = [
    {
      label: "label 1",
      value: 20,
      color: "red",
    },
    {
      label: "label 2",
      value: 30,
      color: "blue",
    },
    {
      label: "label 3",
      value: 10,
      color: "green",
    },
    {
      label: "label 4",
      value: 40,
      color: "yellow",
    },
  ];

  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <PieChart data={data} />
    </div>
  );
}

export default App;
