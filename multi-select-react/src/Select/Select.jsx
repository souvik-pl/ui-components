import React, { useEffect, useState } from "react";
import { SelectContext } from "./useContext";

function Select({ valueList, onSelect, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedValueList, setSelectedValueList] = useState(valueList || []);
  const [focusIndex, setFocusIndex] = useState(null);
  const [optionCount, setOptionCount] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    onSelect(selectedValueList);
  }, [selectedValueList]);

  return (
    <SelectContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        selectedValueList,
        setSelectedValueList,
        focusIndex,
        setFocusIndex,
        optionCount,
        setOptionCount,
        options,
        setOptions,
      }}
    >
      <div style={{ position: "relative" }}>{children}</div>
    </SelectContext.Provider>
  );
}

export default Select;
