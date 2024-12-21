import React, { useEffect, useState } from "react";
import { SelectContext } from "./useContext";

function Select({ onSelect, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [focusIndex, setFocusIndex] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    onSelect(selectedValue);
  }, [selectedValue]);

  return (
    <SelectContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        selectedValue,
        setSelectedValue,
        focusIndex,
        setFocusIndex,
        itemCount,
        setItemCount,
        options,
        setOptions,
      }}
    >
      <div style={{ width: "max-content", position: "relative" }}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export default Select;
