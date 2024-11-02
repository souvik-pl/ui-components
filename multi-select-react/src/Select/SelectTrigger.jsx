import React from "react";
import { useSelectContext } from "./useContext";

function SelectTrigger({ children }) {
  const {
    isMenuOpen,
    setIsMenuOpen,
    selectedValueList,
    setSelectedValueList,
    focusIndex,
    setFocusIndex,
    optionCount,
    options,
  } = useSelectContext();

  const keydownHandler = (e) => {
    if (e.key === "Enter") {
      if (isMenuOpen && focusIndex !== null) {
        // Select the focused item based on focusIndex
        const selectedItem = options[focusIndex].value;
        if (selectedValueList.includes(selectedItem)) {
          setSelectedValueList(
            selectedValueList.filter((v) => v !== selectedItem)
          );
        } else {
          setSelectedValueList([...selectedValueList, selectedItem]);
        }
      } else {
        setIsMenuOpen(!isMenuOpen); // Open/close the dropdown
        setFocusIndex(null); // Reset focusIndex
      }
    } else if (e.key === "ArrowDown") {
      if (focusIndex === null) setFocusIndex(0);
      else setFocusIndex(focusIndex + 1 < optionCount ? focusIndex + 1 : 0);
    } else if (e.key === "ArrowUp") {
      if (focusIndex === null) setFocusIndex(optionCount - 1);
      else
        setFocusIndex(focusIndex - 1 >= 0 ? focusIndex - 1 : optionCount - 1);
    }
  };

  return (
    <div
      style={{ width: "250px", border: "1px solid black", cursor: "default" }}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      onMouseDown={(e) => e.stopPropagation()}
      tabIndex="0"
      onKeyDown={keydownHandler}
    >
      {selectedValueList.length === 0
        ? children
        : selectedValueList.reduce((acc, curr) => `${acc}, ${curr}`)}
    </div>
  );
}

export default SelectTrigger;
