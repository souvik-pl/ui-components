import React, { Children, useRef, useState, useEffect } from "react";

function Breadcrumbs({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);
  const slicedList = children.slice(1, -1);
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

  return (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: "10px",
          listStyle: "none",
        }}
      >
        {children.length <= 3 ? (
          Children.map(children, (child) => <li>{child} /</li>)
        ) : (
          <>
            <li>{children[0]} /</li>
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
                  {Children.map(slicedList, (child, index) => (
                    <li
                      style={{
                        padding: "5px",
                        backgroundColor:
                          focusIndex === index ? "lightgray" : "white",
                      }}
                    >
                      {child}
                    </li>
                  ))}
                </div>
              )}
            </div>
            <li>/ {children[children.length - 1]} /</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
