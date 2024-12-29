import React from "react";
import Tab from "./Tab";
import { useState } from "react";

const TAB_LIST = [
  {
    id: "tab_1",
    label: "Tab 1",
    content: "Content 1",
    isDisabled: false,
  },
  {
    id: "tab_2",
    label: "Tab 2",
    content: "Content 2",
    isDisabled: false,
  },
  {
    id: "tab_3",
    label: "Tab 3",
    content: "Content 3",
    isDisabled: true,
  },
  {
    id: "tab_4",
    label: "Tab 4",
    content: "Content 4",
    isDisabled: false,
  },
];

const App = () => {
  const [selectedTabId, setSelectedTabId] = useState("tab_2");

  return (
    <div style={{ width: "500px", height: "400px" }}>
      <Tab
        selectedTabId={selectedTabId}
        onSelect={(id) => {
          setSelectedTabId(id);
          console.log(id);
        }}
      >
        <Tab.TabList>
          {TAB_LIST.map((tab) => (
            <Tab.TabItem
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isDisabled={tab.isDisabled}
            />
          ))}
        </Tab.TabList>
        <Tab.TabPanelList>
          {TAB_LIST.map((tab) => (
            <Tab.TabPanel key={tab.id} id={tab.id}>
              {tab.content}
            </Tab.TabPanel>
          ))}
        </Tab.TabPanelList>
      </Tab>
    </div>
  );
};

export default App;

/**


  <Tab>
    <Tab.TabList>
      <Tab.TabItem />
      <Tab.TabItem />
      <Tab.TabItem />
    </Tab.TabList>
    <Tab.TabPanelList>
      <Tab.TabPanel></Tab.TabPanel>
      <Tab.TabPanel></Tab.TabPanel>
      <Tab.TabPanel></Tab.TabPanel>
    </Tab.TabPanelList>
  </Tab>

 */
