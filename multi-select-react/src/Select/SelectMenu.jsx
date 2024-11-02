import React, { useEffect, useRef, Children } from "react";
import { useSelectContext } from "./useContext";

function SelectMenu({ children }) {
  const { isMenuOpen, setIsMenuOpen, setOptionCount, setOptions } =
    useSelectContext();
  const ref = useRef();

  useEffect(() => {
    setOptionCount(children.length);
    const childOptions = Children.map(children, (child) => ({
      value: child.props.value,
      label: child.props.children,
    }));
    setOptions(childOptions);

    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    isMenuOpen && (
      <div
        ref={ref}
        style={{
          width: "250px",
          position: "absolute",
          top: "100%",
          left: "0",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {children}
      </div>
    )
  );
}

export default SelectMenu;
