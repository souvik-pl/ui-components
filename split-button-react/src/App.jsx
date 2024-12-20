import React from "react";
import SplitButton from "./SplitButton/SplitButton";
import "./App.css";

function App() {
  const buttonList = [
    {
      label: "Send",
      handler: () => console.log("send"),
    },
    {
      label: "Schedule Send",
      handler: () => console.log("Schedule send"),
    },
    {
      label: "Copy",
      handler: () => console.log("Copy"),
    },
    {
      label: "Paste",
      handler: () => console.log("Paste"),
    },
  ];

  return <SplitButton buttonList={buttonList} />;
}

export default App;
