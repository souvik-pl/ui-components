import React from "react";

function StarRating({ value, starCount, setValue }) {
  const keydownHandler = (e) => {
    switch (e.key) {
      case "ArrowRight":
        setValue(value < starCount ? value + 1 : starCount);
        break;
      case "ArrowLeft":
        setValue(value > 1 ? value - 1 : 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{ display: "flex", gap: "15px" }}
      tabIndex="0"
      onKeyDown={keydownHandler}
    >
      {Array.from({ length: starCount }).map((_, index) => (
        <div
          key={index}
          style={{
            fontSize: "40px",
            cursor: "pointer",
            color: index < value ? "orange" : "",
          }}
          onClick={() => setValue(index + 1)}
        >
          &#9733;
        </div>
      ))}
    </div>
  );
}

export default StarRating;
