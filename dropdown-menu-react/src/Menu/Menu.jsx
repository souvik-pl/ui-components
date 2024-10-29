import React, { useState } from "react";
import { MenuContext } from "./context";

function Menu({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);
  const [optionCount, setOptionCount] = useState(0);

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        focusIndex,
        setFocusIndex,
        optionCount,
        setOptionCount,
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
}

export default Menu;
