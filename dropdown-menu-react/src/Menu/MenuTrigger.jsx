import React from "react";
import { useMenuContext } from "./context";

function MenuTrigger({ children }) {
  const { isMenuOpen, setIsMenuOpen, focusIndex, setFocusIndex, optionCount } =
    useMenuContext();

  const keydownHandler = (e) => {
    if (e.key === "Enter") {
      setIsMenuOpen(!isMenuOpen);
      setFocusIndex(null);
    } else if (e.key === "ArrowDown") {
      if (focusIndex === null) setFocusIndex(0);
      else setFocusIndex(focusIndex + 1 < optionCount ? focusIndex + 1 : 0);
    } else if (e.key === "ArrowUp") {
      if (focusIndex === null) setFocusIndex(optionCount - 1);
      else setFocusIndex(focusIndex - 1 < 0 ? optionCount - 1 : focusIndex - 1);
    }
  };

  return (
    <span
      tabIndex={0}
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
        setFocusIndex(null);
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={keydownHandler}
    >
      {children}
    </span>
  );
}

export default MenuTrigger;
