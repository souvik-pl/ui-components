import React from "react";

function CarouselItem({ children, width, height }) {
  return (
    <div
      style={{
        width,
        height,
      }}
    >
      {children}
    </div>
  );
}

export default CarouselItem;
