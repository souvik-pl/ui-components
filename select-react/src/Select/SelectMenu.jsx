import React, { useEffect, useRef, Children } from "react";
import { useSelectContext } from "./useContext";

function SelectMenu({ children }) {
  const { isMenuOpen, setIsMenuOpen, setItemCount, setOptions } =
    useSelectContext();
  const ref = useRef(null);

  useEffect(() => {
    setItemCount(children.length);
    const childOptions = Children.map(children, (child) => ({
      value: child.props.value,
      label: child.props.children,
    }));
    setOptions(childOptions);

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    isMenuOpen && (
      <div
        ref={ref}
        style={{
          width: "100px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "5px",
          padding: "10px",
          position: "absolute",
          backgroundColor: "white",
          top: "100%",
          left: "0",
          zIndex: "10",
        }}
      >
        {children}
      </div>
    )
  );
}

export default SelectMenu;
