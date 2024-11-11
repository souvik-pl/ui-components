import { useState, useEffect, useRef } from "react";
import "./App.css";

export function DropdownMenu({ children, menuList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);
  const [menuPositionX, setMenuPositionX] = useState("top");
  const [menuPositionY, setMenuPositionY] = useState("right");
  const menuRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        toggleDropdown(false);
        setFocusIndex(null);
      }
    };

    document.addEventListener("mousedown", clickOutsideHandler);
    return () => document.removeEventListener("mousedown", clickOutsideHandler);
  }, []);

  const selectItem = (index) => {
    menuList[index].handler();
    setFocusIndex(null);
  };

  const keydownHandler = (e) => {
    if (e.key === "ArrowDown") {
      if (focusIndex === null) setFocusIndex(0);
      else setFocusIndex(focusIndex + 1 < menuList.length ? focusIndex + 1 : 0);
    } else if (e.key === "ArrowUp") {
      if (focusIndex === null) setFocusIndex(menuList.length - 1);
      else
        setFocusIndex(
          focusIndex - 1 >= 0 ? focusIndex - 1 : menuList.length - 1
        );
    } else if (e.key === "Enter" || e.key === " ") {
      if (focusIndex !== null) {
        selectItem(focusIndex);
      }
    }
  };

  const toggleDropdown = (value) => {
    if (!value) setIsOpen(value);
    else {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceRight = window.innerWidth - buttonRect.x;
      const dropdownHeight = menuList.length * 30;
      const dropdownWidth = 100;

      if (spaceBelow < dropdownHeight) {
        setMenuPositionX("top");
      } else {
        setMenuPositionX("bottom");
      }

      if (spaceRight < dropdownWidth) {
        setMenuPositionY("left");
      } else {
        setMenuPositionY("right");
      }

      setIsOpen(value);
    }
  };

  return (
    <div className="ddMenu">
      <button
        ref={buttonRef}
        onClick={() => {
          toggleDropdown(!isOpen);
          setFocusIndex(null);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={keydownHandler}
        aria-expanded={isOpen}
      >
        {children}
      </button>
      {isOpen && (
        <ul
          ref={menuRef}
          className="ddMenuContent"
          style={{
            [menuPositionX === "top" ? "bottom" : "top"]: "100%",
            [menuPositionY === "right" ? "left" : "right"]: "0",
          }}
          role="menu"
        >
          {menuList.map((item, index) => (
            <li
              key={index}
              className={`ddItem ${focusIndex === index ? "ddItem-focus" : ""}`}
              onClick={() => {
                selectItem(index);
                toggleDropdown(false);
              }}
              role="menuitem"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
