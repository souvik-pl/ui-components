import React from "react";
import Carousel from "./Carousel/Carousel";
import CarouselItem from "./Carousel/CarouselItem";

const list = [
  {
    id: "c1",
    content: "Image 1",
  },
  {
    id: "c2",
    content: "Image 2",
  },
  {
    id: "c3",
    content: "Image 3",
  },
  {
    id: "c4",
    content: "Image 4",
  },
];

function App() {
  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <Carousel autoSlide={true} interval={2000}>
        {list.map((item) => (
          <CarouselItem key={item.id} width="400px" height="300px">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.content}
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
