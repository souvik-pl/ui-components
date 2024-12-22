import React, { useState } from "react";
import StarRating from "./StarRating/StarRating";

function App() {
  const [rating, setRating] = useState(0);
  const ratingValueChangeHandler = (value) => {
    console.log(value);
    setRating(value);
  };
  return (
    <div>
      <StarRating
        starCount={5}
        value={rating}
        setValue={ratingValueChangeHandler}
      />
    </div>
  );
}

export default App;

/**
 * value
 * precision = any number which divides 1 and leaves remainder 0
 * readOnly
 * starCount
 * keyboard left and right arrows - it will take care of the precision before moving to next star
 */
