import React, { useEffect, useRef, useState } from "react";

function Breadcrumbs({ list }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);
  const ref = useRef();
  const slicedList = list.slice(1, -1);

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
    if (e.key === "ArrowUp") {
      if (focusIndex === null) setFocusIndex(slicedList.length - 1);
      else
        setFocusIndex(
          focusIndex - 1 < 0 ? slicedList.length - 1 : focusIndex - 1
        );
    } else if (e.key === "ArrowDown") {
      if (focusIndex === null) setFocusIndex(0);
      else
        setFocusIndex(
          focusIndex + 1 > slicedList.length - 1 ? 0 : focusIndex + 1
        );
    }
  };

  return list.length <= 3 ? (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: "10px",
          listStyle: "none",
        }}
      >
        {list.map((item) => (
          <li key={item.id}>
            <a tabIndex="0">{item.label}</a> /
          </li>
        ))}
      </ul>
    </nav>
  ) : (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: "10px",
          listStyle: "none",
        }}
      >
        <li>
          <a tabIndex="0">{list[0].label}</a> /
        </li>
        <div
          style={{
            position: "relative",
          }}
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={keydownHandler}
          >
            ...
          </button>
          {isMenuOpen && (
            <div
              ref={ref}
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: 100,
                padding: "10px",
                background: "white",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                width: "150px",
              }}
            >
              {slicedList.map((item, index) => (
                <li
                  key={item.id}
                  style={{
                    padding: "5px",
                    backgroundColor:
                      focusIndex === index ? "lightgray" : "white",
                  }}
                >
                  <a tabIndex="0">{item.label}</a>
                </li>
              ))}
            </div>
          )}
        </div>

        <li>
          / <a tabIndex="0">{list[list.length - 1].label}</a> /
        </li>
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
