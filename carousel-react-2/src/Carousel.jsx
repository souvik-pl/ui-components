import { useState, useEffect } from "react";
import "./index.css";

export function Carousel({
  children,
  startIndex,
  autoplay,
  interval,
  loop,
  showIndicators,
  showArrows,
  height,
  width,
  onSlideChange,
}) {
  const [itemIndex, setItemIndex] = useState(startIndex || 0);
  const [pauseAutoplay, setPauseAutoplay] = useState(false);

  useEffect(() => {
    onSlideChange(itemIndex);
    let timer;
    if (autoplay) {
      timer = setInterval(() => {
        if (!pauseAutoplay) {
          nextHandler();
        }
      }, interval || 1000);
    }

    return () => timer && clearInterval(timer);
  }, [itemIndex, pauseAutoplay]);

  const keydownHandler = (e) => {
    if (e.key === "ArrowLeft") prevHandler();
    else if (e.key === "ArrowRight") nextHandler();
  };

  const prevHandler = () => {
    let newIndex = itemIndex - 1;
    if (newIndex >= 0) setItemIndex(newIndex);
    else if (newIndex < 0 && loop) setItemIndex(children.length - 1);
  };

  const nextHandler = () => {
    let newIndex = itemIndex + 1;
    if (newIndex < children.length) setItemIndex(newIndex);
    else if (newIndex >= children.length - 1 && loop) setItemIndex(0);
  };

  return (
    <div
      style={{ height, width, position: "relative" }}
      tabIndex={0}
      onKeyDown={keydownHandler}
      onMouseEnter={() => setPauseAutoplay(true)}
      onMouseLeave={() => setPauseAutoplay(false)}
    >
      {children[itemIndex]}

      {showArrows && (
        <NavArrows prevHandler={prevHandler} nextHandler={nextHandler} />
      )}

      {showIndicators && (
        <Indicators
          currIndex={itemIndex}
          carouselLength={children.length}
          updateIndex={setItemIndex}
        />
      )}
    </div>
  );
}

function NavArrows({ prevHandler, nextHandler }) {
  return (
    <>
      <button className="arrow arrow_left" onClick={prevHandler}>
        &lt;
      </button>
      <button className="arrow arrow_right" onClick={nextHandler}>
        &gt;
      </button>
    </>
  );
}

function Indicators({ currIndex, carouselLength, updateIndex }) {
  return (
    <div className="indicatorContainer">
      {Array.from({ length: carouselLength }).map((_, index) => (
        <span
          key={index}
          className={`indicator ${currIndex === index && "indicator_focused"}`}
          onClick={() => updateIndex(index)}
        ></span>
      ))}
    </div>
  );
}

export function CarouselItem({ children }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "teal",
      }}
    >
      {children}
    </div>
  );
}
