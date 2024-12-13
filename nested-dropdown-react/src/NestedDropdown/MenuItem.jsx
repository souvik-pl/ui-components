import React, { useState } from "react";
import Menu from "./Menu";

function MenuItem({ item }) {
  const [openSubMenu, setOpenSubMenu] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpenSubMenu(true)}
      onMouseLeave={() => setOpenSubMenu(false)}
    >
      <div
        style={{
          padding: "5px",
          display: "flex",
          justifyContent: "space-between",
          cursor: "default",
        }}
        onClick={item.onSelect}
      >
        <span>{item.label}</span>
        <span>{item.children && item.children.length > 0 && ">"}</span>
      </div>
      {item.children && item.children.length > 0 && openSubMenu && (
        <Menu>
          {item.children.map((child, index) => (
            <MenuItem key={index} item={child} index={index} />
          ))}
        </Menu>
      )}
    </div>
  );
}

export default MenuItem;
