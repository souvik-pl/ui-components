import React, { useEffect, useState } from "react";

function App() {
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = totalTime - 1;
      if (newTime < 0 || isPaused) {
        clearInterval(timer);
      } else {
        setTotalTime(newTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [totalTime, isPaused]);

  const timeInputHandler = (e, type) => {
    const value = Number(e.target.value);
    if (type === "hour") {
      setHour(value);
    } else if (type === "minute") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  const startHandler = () => {
    const totalTime = hour * 3600 + minutes * 60 + seconds;
    setTotalTime(totalTime);
  };

  const resetHandler = () => {
    setTotalTime(0);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>H:</label>
        <input
          type="number"
          value={hour}
          onChange={(e) => timeInputHandler(e, "hour")}
        />
        <label>M:</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => timeInputHandler(e, "minute")}
        />
        <label>S:</label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => timeInputHandler(e, "second")}
        />
        <button onClick={startHandler}>Start</button>
      </div>
      <div>
        <h1>Countdown Timer</h1>
        <p>
          {Math.floor(totalTime / 3600)} : {Math.floor((totalTime % 3600) / 60)}{" "}
          : {Math.floor((totalTime % 3600) % 60)}
        </p>
      </div>
      <div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          disabled={totalTime === 0}
        >
          {isPaused ? "Play" : "Pause"}
        </button>
        <button onClick={resetHandler}>Reset</button>
      </div>
    </div>
  );
}

export default App;
