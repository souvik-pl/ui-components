import React, { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

function NestedDropdown({ children, menuList }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid black",
        width: "max-content",
      }}
    >
      <span
        style={{
          cursor: "default",
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseDown={(e) => e.stopPropagation()}
        tabIndex="0"
        onKeyDown={keydownHandler}
      >
        {children}
      </span>
      {isMenuOpen && (
        <div ref={ref}>
          <Menu>
            {menuList.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
}

export default NestedDropdown;
