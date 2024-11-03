import React, { useEffect, useRef, useState } from "react";

function Select({ valueList, optionList, onSelect }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
        setFocusIndex(null);
      }
    };

    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);

  const clickHandler = (value) => {
    if (valueList.includes(value)) {
      const index = valueList.indexOf(value);
      valueList.splice(index, 1);
      onSelect([...valueList]);
    } else {
      onSelect([...valueList, value]);
    }
  };

  const keydownHandler = (e) => {
    if (e.key === "Enter") {
      if (isMenuOpen && focusIndex !== null) {
        clickHandler(optionList[focusIndex].value);
      } else if (isMenuOpen) {
        setIsMenuOpen(false);
        setFocusIndex(null);
      } else {
        setIsMenuOpen(true);
      }
    } else if (e.key === "ArrowUp") {
      if (focusIndex === null) setFocusIndex(optionList.length - 1);
      else
        setFocusIndex(
          focusIndex - 1 >= 0 ? focusIndex - 1 : optionList.length - 1
        );
    } else if (e.key === "ArrowDown") {
      if (focusIndex === null) setFocusIndex(0);
      else
        setFocusIndex(focusIndex + 1 < optionList.length ? focusIndex + 1 : 0);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "200px",
          padding: "5px",
          border: "1px solid black",
          cursor: "pointer",
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseDown={(e) => e.stopPropagation()}
        tabIndex="0"
        onKeyDown={keydownHandler}
      >
        {valueList.length === 0
          ? "Select values"
          : valueList.reduce((acc, curr) => `${acc}, ${curr}`)}
      </div>
      {isMenuOpen && (
        <div
          ref={ref}
          style={{
            width: "200px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          {optionList.map((option, index) => (
            <div
              key={index}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: valueList.includes(option.value)
                  ? "lightgray"
                  : "white",
                border: focusIndex === index ? "1px solid black" : "",
              }}
              onClick={() => clickHandler(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
