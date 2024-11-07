import React, { useState } from "react";

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const activateLight = (index) => {
    if (order.includes(index)) return;
    if (isDeactivating) return;
    const newOrder = [...order, index];
    setOrder(newOrder);
    if (newOrder.length === config.flat(1).length - 1) {
      deactivateLights();
    }
  };

  const deactivateLights = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((order) => {
        const newOrder = [...order];
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };

  return (
    <div
      style={{
        marginTop: "100px",
        marginLeft: "100px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        width: "200px",
      }}
    >
      {config.flat(1).map((isLight, index) =>
        isLight ? (
          <div
            key={index}
            style={{
              width: "50px",
              height: "50px",
              border: "1px solid black",
              backgroundColor: order.includes(index) ? "green" : "white",
            }}
            onClick={() => activateLight(index)}
          ></div>
        ) : (
          <div key={index}></div>
        )
      )}
    </div>
  );
}

export default App;
