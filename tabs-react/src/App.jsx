import React, { useState } from "react";
import TabList from "./TabList/TabList";
import Tab from "./TabList/Tab";

const tabList = [
  {
    label: "Item 1",
    value: "item_1",
  },
  {
    label: "Item 2",
    value: "item_2",
  },
  {
    label: "Item 3",
    value: "item_3",
  },
  {
    label: "Item 4",
    value: "item_4",
  },
];

function App() {
  const [value, setValue] = useState("item_1");
  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <TabList value={value} onChange={handleChange}>
        {tabList.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </TabList>
    </div>
  );
}

export default App;
