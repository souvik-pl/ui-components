import React from "react";

function Bargraph({ data, unit }) {
  const maxValue = Math.max(...Object.values(data));
  unit = unit || Math.floor(maxValue / 10);
  const yAxisPointCount = Math.floor(maxValue / unit) + 2;
  const totalHeight = yAxisPointCount * unit;
  const yAxisPoints = Array.from(
    { length: yAxisPointCount },
    (_, index) => index * unit
  ).reverse();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {yAxisPoints.map((point) => (
          <div
            key={point}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              flex: 1,
              borderBottom: "1px solid black",
            }}
          >
            {point}
          </div>
        ))}
      </div>
      <div
        style={{
          width: "calc(100% - 50px)",
          height: "100%",
          borderBottom: "1px solid black",
          borderLeft: "1px solid black",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
          }}
        >
          {Object.values(data).map((value) => (
            <div
              style={{
                backgroundColor: "teal",
                width: "30px",
                height: `${(value * 100) / totalHeight}%`,
              }}
            >
              {value}
            </div>
          ))}
        </div>
        <div
          style={{
            width: "100%",
            position: "absolute",
            bottom: "-20px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {Object.keys(data).map((key) => (
            <div key={key}>{key}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bargraph;
