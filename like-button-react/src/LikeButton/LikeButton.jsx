import React, { useState } from "react";
import "./LikeButton.css";
import { Heart, LoaderCircle } from "lucide-react";

function LikeButton({ isLiked, isLoading, clickHandler }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      style={{
        height: "40px",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "30px",
        border: "none",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: isLiked ? "red" : "white",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: isLiked ? "red" : isHover ? "red" : "grey",
      }}
      onClick={clickHandler}
      disabled={isLoading}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isLoading && (
        <LoaderCircle
          stroke={isLiked ? "white" : isHover ? "red" : "grey"}
          className="spin"
        />
      )}
      {!isLoading && (
        <Heart stroke={isLiked ? "white" : isHover ? "red" : "grey"} />
      )}
      <span
        style={{
          color: isLiked ? "white" : isHover ? "red" : "grey",
        }}
      >
        {isLiked ? "Liked" : "Like"}
      </span>
    </button>
  );
}

export default LikeButton;
