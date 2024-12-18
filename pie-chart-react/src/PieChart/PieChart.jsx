import React from "react";

function PieChart({ data }) {
  let conicGradient = "";
  let percentage = 0;

  for (let i = 0; i < data.length; i++) {
    const { color, value } = data[i];
    if (i !== data.length - 1) {
      conicGradient += `${color} ${percentage}% ${percentage + value}%, `;
    } else {
      conicGradient += `${color} ${percentage}% ${percentage + value}%`;
    }
    percentage += value;
  }

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `conic-gradient(${conicGradient})`,
        }}
      ></div>

      <div>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              width: "150px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: item.color,
                borderRadius: "50%",
                marginRight: "5px",
              }}
            ></div>
            <div>{item.label}</div>
            <div>({item.value} %)</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieChart;
