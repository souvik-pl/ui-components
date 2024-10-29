import React, { useEffect, useRef, Children } from "react";
import { useMenuContext } from "./context";

function MenuContent({ children }) {
  const {
    isMenuOpen,
    setIsMenuOpen,
    focusIndex,
    setFocusIndex,
    setOptionCount,
  } = useMenuContext();
  const ref = useRef();

  useEffect(() => {
    setOptionCount(children.length);
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

  return (
    isMenuOpen && (
      <ul
        ref={ref}
        style={{
          listStyle: "none",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          position: "absolute",
          top: "100%",
          left: "0",
          zIndex: 100,
          backgroundColor: "white",
          width: "100px",
        }}
      >
        {Children.map(children, (child, index) => (
          <li
            style={{
              backgroundColor: focusIndex === index ? "lightgray" : "white",
            }}
          >
            {child}
          </li>
        ))}
      </ul>
    )
  );
}

export default MenuContent;
