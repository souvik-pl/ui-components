import React, { useState } from "react";
import DatePicker from "./DatePicker/DatePicker";

function App() {
  const [value, setValue] = useState(new Date(2024, 6, 19));
  const changeHandler = (selectedDate) => {
    console.log("Selected Date:", selectedDate);
    setValue(selectedDate);
  };

  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <DatePicker onChange={changeHandler} value={value} />
    </div>
  );
}

export default App;
