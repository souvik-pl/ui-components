import React from "react";
import "./App.css";
import { useState, Children, createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";

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

const CarouselContext = createContext();

const Carousel = ({
  children,
  itemInView,
  setItemInView,
  showArrows,
  showIndicator,
  loop,
  autoplay,
  interval,
}) => {
  const [pauseAutoplay, setPauseAutoplay] = useState(false);
  const allItems = Children.map(children, (child) => child.props.item);
  const itemInViewIndex = allItems.findIndex(
    (item) => item.id === itemInView.id
  );

  const nextHandler = () => {
    if (itemInViewIndex + 1 < allItems.length) {
      setItemInView(allItems[itemInViewIndex + 1]);
    } else if (itemInViewIndex + 1 >= allItems.length && loop) {
      setItemInView(allItems[0]);
    }
  };

  const prevHandler = () => {
    if (itemInViewIndex - 1 >= 0) {
      setItemInView(allItems[itemInViewIndex - 1]);
    } else if (itemInViewIndex - 1 < 0 && loop) {
      setItemInView(allItems[allItems.length - 1]);
    }
  };

  const selectItemHandler = (index) => {
    setItemInView(allItems[index]);
  };

  useEffect(() => {
    let timer;
    if (autoplay && !pauseAutoplay) {
      timer = setTimeout(nextHandler, interval);
    }

    return () => timer && clearTimeout(timer);
  }, [autoplay, interval, nextHandler, pauseAutoplay]);

  return (
    <CarouselContext.Provider value={true}>
      <div
        className="carousel_container"
        onMouseEnter={() => setPauseAutoplay(true)}
        onMouseLeave={() => setPauseAutoplay(false)}
      >
        {children[itemInViewIndex]}
        {showArrows && (
          <Carousel.Arrows
            nextHandler={nextHandler}
            prevHandler={prevHandler}
          />
        )}

        {showIndicator && (
          <Carousel.Indicator
            itemInViewIndex={itemInViewIndex}
            itemLength={allItems.length}
            selectItemHandler={selectItemHandler}
          />
        )}
      </div>
    </CarouselContext.Provider>
  );
};

Carousel.Arrows = ({ prevHandler, nextHandler }) => {
  const carouselContext = useContext(CarouselContext);

  if (!carouselContext) {
    console.error(
      "Carousel.Arrows component must be used within Carousel component"
    );
    return null;
  }

  return (
    <>
      <button
        className="carousel_arrow carousel_arrow_left"
        onClick={prevHandler}
      >
        &lt;
      </button>
      <button
        className="carousel_arrow carousel_arrow_right"
        onClick={nextHandler}
      >
        &gt;
      </button>
    </>
  );
};

Carousel.Indicator = ({ itemInViewIndex, itemLength, selectItemHandler }) => {
  const carouselContext = useContext(CarouselContext);

  if (!carouselContext) {
    console.error(
      "Carousel.Indicator component must be used within Carousel component"
    );
    return null;
  }

  return (
    <div className="indicator_container">
      {Array.from({ length: itemLength }).map((_, index) => (
        <div
          key={index}
          className={
            index === itemInViewIndex
              ? "indicator_item indicator_in_view"
              : "indicator_item"
          }
          onClick={() => selectItemHandler(index)}
        ></div>
      ))}
    </div>
  );
};

Carousel.Item = ({ item }) => {
  const carouselContext = useContext(CarouselContext);

  if (!carouselContext) {
    console.error(
      "Carousel.Item component must be used within Carousel component"
    );
    return null;
  }

  return <img className="carousel_item" src={item.src} />;
};

const App = () => {
  const [imageInView, setImageInView] = useState(images[0]);

  return (
    <div className="app">
      <Carousel
        itemInView={imageInView}
        setItemInView={setImageInView}
        showArrows={true}
        showIndicator={true}
        loop={true}
        autoplay={true}
        interval={1500}
      >
        {images.map((item) => (
          <Carousel.Item key={item.id} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

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
