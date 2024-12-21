import React, { useEffect } from "react";
import { useSelectContext } from "./useContext";

function SelectTrigger({ value, children }) {
  const {
    isMenuOpen,
    setIsMenuOpen,
    selectedValue,
    setSelectedValue,
    focusIndex,
    setFocusIndex,
    itemCount,
    options,
  } = useSelectContext();

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const keydownHandler = (e) => {
    if (e.key === "Enter") {
      if (isMenuOpen && focusIndex !== null) {
        // Select the focused item based on focusIndex
        const selectedItem = options[focusIndex];
        if (selectedItem) {
          setSelectedValue(selectedItem.value);
          setIsMenuOpen(false); // Close the menu
        }
      } else {
        setIsMenuOpen(!isMenuOpen); // Open/close the dropdown
      }
      setFocusIndex(null); // Reset focusIndex
    } else if (e.key === "ArrowDown") {
      if (focusIndex === null) setFocusIndex(0);
      else setFocusIndex(focusIndex + 1 < itemCount ? focusIndex + 1 : 0);
    } else if (e.key === "ArrowUp") {
      if (focusIndex === null) setFocusIndex(itemCount - 1);
      else setFocusIndex(focusIndex - 1 >= 0 ? focusIndex - 1 : itemCount - 1);
    }
  };

  return (
    <div
      style={{
        width: "100px",
        height: "30px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px 20px",
        cursor: "default",
      }}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      onMouseDown={(e) => e.stopPropagation()}
      tabIndex="0"
      onKeyDown={keydownHandler}
    >
      {selectedValue || children}
    </div>
  );
}

export default SelectTrigger;
