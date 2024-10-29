import React from "react";
import Menu from "./Menu/Menu";
import MenuTrigger from "./Menu/MenuTrigger";
import MenuContent from "./Menu/MenuContent";
import MenuItem from "./Menu/MenuItem";

function App() {
  return (
    <div
      style={{
        marginTop: "200px",
        marginLeft: "200px",
      }}
    >
      <Menu>
        <MenuTrigger>
          <span
            style={{
              cursor: "pointer",
              padding: "5px",
              backgroundColor: "lightskyblue",
            }}
          >
            My Account
          </span>
        </MenuTrigger>
        <MenuContent>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
          <MenuItem>Option 4</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}

export default App;
