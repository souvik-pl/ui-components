import React, { useEffect, useRef, useState } from "react";
import { getSearchResults } from "./data";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
        setFocusIndex(null);
      }
    };

    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, []);

  const searchInputHandler = (e) => {
    setIsMenuOpen(true);
    setInputValue(e.target.value);
    setSearchResults(!e.target.value ? [] : getSearchResults(e.target.value));
    setFocusIndex(null);
  };

  const keydownHandler = (e) => {
    if (e.key === "Enter") {
      if (isMenuOpen && focusIndex !== null) {
        selectDataHandler(searchResults[focusIndex].name, focusIndex);
      }
    } else if (e.key === "ArrowUp") {
      if (focusIndex === null) setFocusIndex(searchResults.length - 1);
      else
        setFocusIndex(
          focusIndex - 1 >= 0 ? focusIndex - 1 : searchResults.length - 1
        );
    } else if (e.key === "ArrowDown") {
      if (focusIndex === null) setFocusIndex(0);
      else
        setFocusIndex(
          focusIndex + 1 < searchResults.length ? focusIndex + 1 : 0
        );
    } else if (e.key === "Backspace") {
      if (!e.target.value) {
        const newValues = selectedList.slice(0, selectedList.length - 1);
        setSelectedList(newValues);
      }
    }
  };

  const selectDataHandler = (data, index) => {
    setFocusIndex(index);
    if (!selectedList.includes(data)) {
      setSelectedList([...selectedList, data]);
    }
  };

  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <div
        style={{
          width: "400px",
          minHeight: "30px",
          border: "1px solid black",
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        {selectedList.map((data, index) => (
          <div
            style={{
              padding: "5px",
              backgroundColor: "lightgray",
            }}
            key={index}
          >
            {data}
          </div>
        ))}
        <input
          style={{
            flex: "1",
            minWidth: "50%",
            padding: "5px",
          }}
          placeholder="Search and select"
          value={inputValue}
          onChange={searchInputHandler}
          onKeyDown={keydownHandler}
          onClick={() => setIsMenuOpen(true)}
          onMouseDown={(e) => e.stopPropagation()}
        />
        {isMenuOpen && (
          <div
            ref={ref}
            style={{
              width: "100%",
              position: "absolute",
              top: "100%",
              left: "0",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            {searchResults.map((result, index) => (
              <div
                style={{
                  padding: "5px",
                  cursor: "pointer",
                  border: focusIndex === index ? "1px solid black" : "",
                }}
                key={result.id}
                onClick={() => selectDataHandler(result.name, index)}
              >
                {result.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
