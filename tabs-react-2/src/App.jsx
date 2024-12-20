import { TabList, Tab } from "./TabList";
import { useState } from "react";

const TAB_LIST = [
  {
    id: "0",
    label: "Tab 1",
    disabled: false,
  },
  {
    id: "1",
    label: "Tab 2",
    disabled: false,
  },
  {
    id: "2",
    label: "Tab 3",
    disabled: false,
  },
  {
    id: "3",
    label: "Tab 4",
    disabled: false,
  },
  {
    id: "4",
    label: "Tab 5",
    disabled: true,
  },
];

export default function App() {
  const [selectedTab, setSelectedTab] = useState("2");
  return (
    <div
      style={{
        marginLeft: "100px",
        marginTop: "100px",
      }}
    >
      <TabList
        selectedTabId={selectedTab}
        onSelect={(id) => {
          console.log("id", id);
          setSelectedTab(id);
        }}
      >
        {TAB_LIST.map((tab, index) => (
          <Tab
            key={index}
            id={tab.id}
            label={tab.label}
            disabled={tab.disabled}
            index={index}
          />
        ))}
      </TabList>
    </div>
  );
}
