import React, { useMemo } from "react";
import NestedDropdown from "./NestedDropdown/NestedDropdown";

function App() {
  const menuList = useMemo(() => {
    return [
      {
        label: "Item 1",
        onSelect: () => console.log("Item 1 selected"),
      },
      {
        label: "Item 2",
        onSelect: () => console.log("Item 2 selected"),
      },
      {
        label: "Item 3",
        children: [
          {
            label: "Subitem 3_1",
            onSelect: () => console.log("Subitem 3_1 selected"),
          },
          {
            label: "Subitem 3_2",
            onSelect: () => console.log("Subitem 3_2 selected"),
          },
        ],
      },
      {
        label: "Item 4",
        children: [
          {
            label: "Subitem 4_1",
            onSelect: () => console.log("Subitem 4_1 selected"),
          },
          {
            label: "Subitem 4_2",
            children: [
              {
                label: "Subitem 4_2_1",
                onSelect: () => console.log("Subitem 4_2_1 selected"),
              },
              {
                label: "Subitem 4_2_2",
                onSelect: () => console.log("Subitem 4_2_2 selected"),
              },
            ],
          },
        ],
      },
    ];
  }, []);

  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <NestedDropdown menuList={menuList}>Open Menu</NestedDropdown>
    </div>
  );
}

export default App;
