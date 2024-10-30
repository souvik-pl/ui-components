import React from "react";

function ActionButton({ label, icon, clickHandler }) {
  return (
    <div title={label} onClick={clickHandler} style={{ cursor: "pointer" }}>
      {icon}
    </div>
  );
}

export default ActionButton;
