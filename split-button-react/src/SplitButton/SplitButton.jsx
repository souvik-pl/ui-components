import React, { useEffect, useRef, useState } from "react";

function SplitButton({ buttonList }) {
  const mainButton = buttonList[0];
  const dropdownButtonList = buttonList.slice(1);
  const [isOpen, setIsOpen] = useState(false);
  const dd = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const keyDownHandler = (e) => {
    switch (e.key) {
      case "ArrowDown":
        setFocusedIndex((prevIndex) =>
          prevIndex < dropdownButtonList.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "ArrowUp":
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : dropdownButtonList.length - 1
        );
        break;
      case "Enter":
      case " ":
        if (focusedIndex !== -1) {
          dropdownButtonList[focusedIndex].handler();
          setIsOpen(false); // Close dropdown after selection
        }
        break;
      case "Escape":
        setIsOpen(false); // Close the dropdown on Escape
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dd.current && !dd.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(-1); // Reset focus when opening dropdown
      dd.current?.focus(); // Focus the dropdown container when opened
    }
  }, [isOpen]);

  return (
    <div id="split_btn_container">
      <button onClick={mainButton.handler}>{mainButton.label}</button>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        \/
      </button>
      {isOpen && (
        <div
          id="dropdown_container"
          ref={dd}
          onKeyDown={keyDownHandler}
          tabIndex="0"
        >
          <ul>
            {dropdownButtonList.map((btn, index) => (
              <li
                key={index}
                onClick={btn.handler}
                style={{
                  backgroundColor: focusedIndex === index ? "lightgray" : "",
                }}
              >
                {btn.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SplitButton;

/**
 * Tab
 * open close
 * click outside handler
 * keyboard up down
 */
