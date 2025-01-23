import React from "react";
import "./App.css";
import { createContext } from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Children } from "react";

const Carousel = ({
  children,
  inView,
  onSlideChange,
  width,
  height,
  showArrows = true,
  showIndicator = true,
  loop = true,
  autoplay = true,
  interval = 2000,
}) => {
  const [itemInView, setItemInView] = useState(inView);
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

  const updateItemInView = (index) => {
    setItemInView(allItems[index]);
  };

  useEffect(() => {
    onSlideChange(itemInView);

    let timer;
    if (autoplay && !pauseAutoplay) {
      timer = setTimeout(nextHandler, interval);
    }

    return () => timer && clearTimeout(timer);
  }, [itemInView, nextHandler, onSlideChange, pauseAutoplay]);

  return (
    <div
      className="carousel"
      style={{ width: width || "100%", height: height || "100%" }}
      onMouseEnter={() => setPauseAutoplay(true)}
      onMouseLeave={() => setPauseAutoplay(false)}
    >
      {children[itemInViewIndex]}

      {showArrows && (
        <NavArrows nextHandler={nextHandler} prevHandler={prevHandler} />
      )}
      {showIndicator && (
        <Indicators
          currIndex={itemInViewIndex}
          itemLength={allItems.length}
          updateIndex={updateItemInView}
        />
      )}
    </div>
  );
};

Carousel.Item = ({ item }) => {
  return <img className="carousel_item" src={item.src} />;
};

const NavArrows = ({ prevHandler, nextHandler }) => {
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
};

const Indicators = ({ currIndex, itemLength, updateIndex }) => {
  return (
    <div className="indicatorContainer">
      {Array.from({ length: itemLength }).map((_, index) => (
        <div
          key={index}
          className={`indicator ${
            currIndex === index ? "indicator_focused" : ""
          }`}
          onClick={() => updateIndex(index)}
        ></div>
      ))}
    </div>
  );
};

export default Carousel;
