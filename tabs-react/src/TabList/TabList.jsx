import React, { Children, useState } from "react";
import { useEffect } from "react";

function TabList({ children, value, onChange }) {
  const [focusIndex, setFocusIndex] = useState(null);

  useEffect(() => {
    const index = children.findIndex((child) => child.props.value === value);
    setFocusIndex(index);
  }, [value]);

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      onChange(children[focusIndex].props.value);
    } else if (e.key === "ArrowLeft") {
      setFocusIndex(focusIndex - 1 >= 0 ? focusIndex - 1 : children.length - 1);
    } else if (e.key === "ArrowRight") {
      setFocusIndex(focusIndex + 1 < children.length ? focusIndex + 1 : 0);
    }
  };

  return (
    <div
      style={{
        display: "flex",
      }}
      onKeyDown={keyDownHandler}
    >
      {Children.map(children, (child, index) => (
        <div
          style={{
            border: child.props.value === value ? "1px solid black" : "",
            backgroundColor: focusIndex === index ? "lightgray" : "white",
          }}
          onClick={() => onChange(child.props.value)}
          tabIndex={child.props.value === value ? 0 : -1}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export default TabList;
