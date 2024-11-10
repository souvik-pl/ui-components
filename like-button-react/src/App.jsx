import React, { useState } from "react";
import LikeButton from "./LikeButton/LikeButton";

function App() {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = () => {
    setIsLoading(true);
    const randomNumber = Math.floor(Math.random() * 10);
    console.log(randomNumber);

    if (randomNumber >= 5) {
      setTimeout(() => {
        setIsLiked(!isLiked);
        setIsLoading(false);
      }, 500);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <LikeButton
        isLiked={isLiked}
        isLoading={isLoading}
        clickHandler={clickHandler}
      />
    </div>
  );
}

export default App;
