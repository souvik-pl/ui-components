import React, { useEffect, useRef, useState } from "react";

function Select({ value, options, onSelect }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);

  const keydownHandler = (e) => {
    if (e.key === "Enter") {
      if (isMenuOpen && focusIndex !== null) {
        onSelect(options[focusIndex].value);
        setIsMenuOpen(false);
        setFocusIndex(null);
      } else if (isMenuOpen) {
        setIsMenuOpen(false);
      } else {
        setIsMenuOpen(true);
      }
    } else if (e.key === "ArrowUp") {
      if (focusIndex === null) setFocusIndex(options.length - 1);
      else
        setFocusIndex(
          focusIndex - 1 >= 0 ? focusIndex - 1 : options.length - 1
        );
    } else if (e.key === "ArrowDown") {
      if (focusIndex === null) setFocusIndex(0);
      else setFocusIndex(focusIndex + 1 < options.length ? focusIndex + 1 : 0);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "250px",
          padding: "10px",
          border: "1px solid black",
          cursor: "pointer",
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseDown={(e) => e.stopPropagation()}
        tabIndex="0"
        onKeyDown={keydownHandler}
      >
        {value || "Select"}
      </div>
      {isMenuOpen && (
        <div
          ref={ref}
          style={{
            width: "250px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              style={{
                padding: "5px",
                cursor: "pointer",
                border: focusIndex === index ? "1px solid black" : "",
              }}
              onClick={() => {
                onSelect(option.value);
                setIsMenuOpen(false);
              }}
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
