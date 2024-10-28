import React, { useEffect, useState } from "react";

function Carousel({ autoSlide, interval, children }) {
  const [index, setIndex] = useState(0);

  const prevHandler = () => {
    setIndex(index - 1 >= 0 ? index - 1 : children.length - 1);
  };

  const nextHandler = () => {
    setIndex(index + 1 < children.length ? index + 1 : 0);
  };

  useEffect(() => {
    if (!autoSlide) return;
    console.log("hi");

    let timer = setInterval(() => {
      nextHandler();
    }, interval || 3000);

    return () => clearInterval(timer);
  }, [autoSlide, index]);

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid black",
        width: "max-content",
      }}
    >
      {children[index]}

      <button
        style={{
          width: "80px",
          position: "absolute",
          top: "50%",
          left: "-90px",
          transform: "translateY(-50%)",
        }}
        onClick={prevHandler}
      >
        Previous
      </button>
      <button
        style={{
          width: "80px",
          position: "absolute",
          top: "50%",
          right: "-90px",
          transform: "translateY(-50%)",
        }}
        onClick={nextHandler}
      >
        Next
      </button>
    </div>
  );
}

export default Carousel;
