import React, { useEffect, useState } from "react";
import Progress from "./Progress/Progress";

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (value < 100) {
        setValue(value + 10);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div>
      <Progress value={value} max={100} />
    </div>
  );
}

export default App;
