import Menu from "./Menu";

const MENU_LIST = [
  {
    label: "Item 1",
    handler: () => console.log("Item 1"),
  },
  {
    label: "Item 2",
    handler: () => console.log("Item 2"),
  },
  {
    label: "Item 3",
    handler: () => console.log("Item 3"),
  },
  {
    label: "Item 4",
    handler: () => console.log("Item 4"),
  },
  {
    label: "Item 5",
    handler: () => console.log("Item 5"),
  },
];

export default function App() {
  const handleOnSelect = (value) => {
    console.log(value);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        // alignItems: "center",
        // justifyContent: "flex-end",
      }}
    >
      <Menu>
        <Menu.Trigger>My Account</Menu.Trigger>
        <Menu.List>
          {MENU_LIST.map((menu, index) => (
            <Menu.Item key={index} handleOnClick={menu.handler}>
              {menu.label}
            </Menu.Item>
          ))}
        </Menu.List>
      </Menu>
    </div>
  );
}

/**
 *
 * 1. Basic UI ✅
 * 2. Open close ✅
 * 3. Click outside ✅
 * 4. attach onclick ✅
 * 5. Keyboard Nav ✅
 * 6. Press enter and select ✅
 * 7. Press escape and close ✅
 * 8. Compound component - prevent/handle errors when someone passes the wrong structure/components inside the Menu ✅
 * 9. Positioning
 */
