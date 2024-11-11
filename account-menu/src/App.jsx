import { DropdownMenu } from "./DropdownMenu";

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
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <DropdownMenu menuList={MENU_LIST}>My Account</DropdownMenu>
    </div>
  );
}
