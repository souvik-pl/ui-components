import React from "react";
import { useSelectContext } from "./useContext";

function SelectItem({ value, index, children }) {
  const { selectedValueList, setSelectedValueList, focusIndex } =
    useSelectContext();

  const toggleSelectionHandler = (value) => {
    if (selectedValueList.includes(value)) {
      setSelectedValueList(selectedValueList.filter((v) => v !== value));
    } else {
      setSelectedValueList([...selectedValueList, value]);
    }
  };

  return (
    <div
      style={{
        padding: "5px",
        cursor: "pointer",
        backgroundColor: selectedValueList.includes(value)
          ? "lightgray"
          : "white",
        border: focusIndex === index ? "1px solid black" : "",
      }}
      onClick={() => toggleSelectionHandler(value)}
    >
      {children}
    </div>
  );
}

export default SelectItem;
