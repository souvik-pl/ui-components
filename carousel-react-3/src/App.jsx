import React from "react";
import { useState } from "react";
import Carousel from "./Carousel";

const images = [
  {
    id: "img1",
    src: "https://picsum.photos/id/600/600/400",
  },
  {
    id: "img2",
    src: "https://picsum.photos/id/100/600/400",
  },
  {
    id: "img3",
    src: "https://picsum.photos/id/200/600/400",
  },
  {
    id: "img4",
    src: "https://picsum.photos/id/300/600/400",
  },
  {
    id: "img5",
    src: "https://picsum.photos/id/400/600/400",
  },
];

function App() {
  const [imageInView, setImageInView] = useState(images[1]);

  const onSlideChange = (img) => {
    console.log(img);
  };

  return (
    <div style={{ width: "400px", height: "300px" }}>
      <Carousel
        inView={imageInView}
        onSlideChange={onSlideChange}
        showArrows={true}
        showIndicator={true}
        loop={true}
        autoplay={true}
        interval={2000}
      >
        {images.map((img) => (
          <Carousel.Item key={img.id} item={img} />
        ))}
      </Carousel>
    </div>
  );
}

export default App;

/*
<Carousel 
  width="200px" 
  height="100px" 
  showArrows={true} 
  showIndicator={true}
  interval={2000}
  inView={img1}
  onSlideChange={(img) => //do something}
  loop={true}
  autoplay={true}
>
  <CarouselItem item={img1} />
  <CarouselItem item={img2} />
  <CarouselItem item={img3} />
</Carousel>

Sequence of actions -
1. Basic UI and components
2. Extra features
3. Keyboard navigation
5. Compound component restriction

*/
