import React from "react";
import { useSelectContext } from "./useContext";

function SelectItem({ value, index, children }) {
  const { setSelectedValue, setIsMenuOpen, focusIndex } = useSelectContext();

  return (
    <div
      style={{
        padding: "5px",
        cursor: "pointer",
        backgroundColor: focusIndex === index ? "lightgray" : "white",
      }}
      onClick={() => {
        setSelectedValue(value);
        setIsMenuOpen(false);
      }}
      onKeyDown={() => {
        setSelectedValue(value);
      }}
    >
      {children}
    </div>
  );
}

export default SelectItem;
