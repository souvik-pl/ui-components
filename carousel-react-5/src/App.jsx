import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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

const DataContext = createContext();
const CarouselContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataContext should be used within Carousel component");

  return context;
};

const Carousel = ({
  children,
  width,
  height,
  inView,
  onSlideChange,
  arrowNav = true,
  indicator = true,
  autoPlay = true,
  loop = true,
}) => {
  const [autoPlayPaused, setAutoPlayPaused] = useState(false);
  const allImages = Children.map(children, (child) => child.props.img);
  const currentIndex = allImages.findIndex((img) => img.id === inView.id);

  const nextHandler = () => {
    if (currentIndex + 1 < allImages.length) {
      onSlideChange(allImages[currentIndex + 1]);
    } else if (currentIndex + 1 >= allImages.length && loop) {
      onSlideChange(allImages[0]);
    }
  };

  const prevHandler = () => {
    if (currentIndex - 1 >= 0) {
      onSlideChange(allImages[currentIndex - 1]);
    } else if (currentIndex - 1 < 0 && loop) {
      onSlideChange(allImages[allImages.length - 1]);
    }
  };

  useEffect(() => {
    if (!autoPlay || autoPlayPaused) return;

    const interval = setInterval(() => {
      nextHandler();
    }, 1500);

    return () => clearInterval(interval);
  }, [nextHandler, autoPlay, autoPlayPaused]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowRight") nextHandler();
      else if (e.key === "ArrowLeft") prevHandler();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [nextHandler, prevHandler]);

  return (
    <DataContext.Provider value={{ inView, onSlideChange }}>
      <CarouselContext.Provider value={true}>
        <div
          onMouseEnter={() => setAutoPlayPaused(true)}
          onMouseLeave={() => setAutoPlayPaused(false)}
          style={{
            width,
            height,
            border: "1px solid black",
            position: "relative",
          }}
        >
          {children}
          {arrowNav && (
            <Carousel.Arrows
              nextHandler={nextHandler}
              prevHandler={prevHandler}
            />
          )}
          {indicator && (
            <Carousel.Indicator
              currentIndex={currentIndex}
              totalItems={allImages.length}
              onSelect={(index) => {
                onSlideChange(allImages[index]);
              }}
            />
          )}
        </div>
      </CarouselContext.Provider>
    </DataContext.Provider>
  );
};

Carousel.Indicator = ({ currentIndex, totalItems, onSelect }) => {
  const context = useContext(CarouselContext);

  if (!context) {
    console.error(
      "Carousel.Indicator component must be used within Carousel component"
    );
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px",
        bottom: "5px",
      }}
    >
      {Array.from({ length: totalItems }).map((_, index) => (
        <div
          key={index}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            border: "2px solid white",
            backgroundColor: index === currentIndex ? "black" : "white",
          }}
          onClick={() => onSelect(index)}
        ></div>
      ))}
    </div>
  );
};

Carousel.Arrows = ({ nextHandler, prevHandler }) => {
  const context = useContext(CarouselContext);

  if (!context) {
    console.error(
      "Carousel.Arrows component must be used within Carousel component"
    );
    return null;
  }

  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "0",
        }}
        onClick={prevHandler}
      >
        &lt;
      </button>
      <button
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "0",
        }}
        onClick={nextHandler}
      >
        &gt;
      </button>
    </>
  );
};

Carousel.Item = ({ img }) => {
  const context = useContext(CarouselContext);

  if (!context) {
    console.error(
      "Carousel.Item component must be used within Carousel component"
    );
    return null;
  }

  const { inView } = useDataContext();

  return (
    img.id === inView.id && (
      <img style={{ width: "100%", height: "100%" }} src={img.src} />
    )
  );
};

function App() {
  const [imageInView, setImageInView] = useState(images[0]);
  return (
    <Carousel
      width="400px"
      height="300px"
      inView={imageInView}
      onSlideChange={setImageInView}
      arrowNav={true}
      indicator={true}
      autoPlay={true}
      loop={true}
    >
      {images.map((img) => (
        <Carousel.Item key={img.id} img={img} />
      ))}
    </Carousel>
  );
}

export default App;

/*

<Carousel>
  <Carousel.Item></Carousel.Item>
  <Carousel.Item></Carousel.Item>
  <Carousel.Item></Carousel.Item>
  <Carousel.Item></Carousel.Item>
</Carousel>

- Basic UI ✅
- Controlled component (inView, onSlideChange) ✅
- Dot indicator ✅
- Arrow navigation ✅
- Autoplay (pause, resume, timer) ✅
- Loop ✅
- Keyboard navigation ✅
- Compound component restriction ✅
*/
