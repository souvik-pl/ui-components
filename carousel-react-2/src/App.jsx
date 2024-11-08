import { Carousel, CarouselItem } from "./Carousel";

export default function App() {
  return (
    <div
      style={{
        border: "1px solid black",
        width: "max-content",
      }}
    >
      <Carousel
        width="400px"
        height="250px"
        showArrows={true}
        loop={true}
        showIndicators={true}
        autoplay={true}
        interval={2000}
        onSlideChange={(value) => console.log(value)}
      >
        <CarouselItem>1</CarouselItem>
        <CarouselItem>2</CarouselItem>
        <CarouselItem>3</CarouselItem>
        <CarouselItem>4</CarouselItem>
      </Carousel>
    </div>
  );
}
