import React from "react";
import { Children } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const TabDataContext = createContext();

const useTabDataContext = () => {
  const context = useContext(TabDataContext);
  if (!context)
    throw new Error("TabContext can only be used within Tab component");
  return context;
};

const TabContext = createContext();

const Tab = ({ children, selectedTabId, onSelect }) => {
  return (
    <TabDataContext.Provider value={{ selectedTabId, onSelect }}>
      <TabContext.Provider value={true}>
        <div style={{ width: "100%", height: "100%" }}>{children}</div>
      </TabContext.Provider>
    </TabDataContext.Provider>
  );
};

const TabListContext = createContext();

Tab.TabList = ({ children }) => {
  const tabContext = useContext(TabContext);
  const [focusIndex, setFocusIndex] = useState(null);
  const { selectedTabId, onSelect } = useTabDataContext();

  const keyDownHandler = (e) => {
    if (e.key === "ArrowRight") {
      if (focusIndex === null) {
        const index = children.findIndex(
          (child) => child.props.id === selectedTabId
        );
        setFocusIndex(index + 1 < children.length ? index + 1 : 0);
      } else {
        setFocusIndex(focusIndex + 1 < children.length ? focusIndex + 1 : 0);
      }
    } else if (e.key === "ArrowLeft") {
      if (focusIndex === null) {
        const index = children.findIndex(
          (child) => child.props.id === selectedTabId
        );
        setFocusIndex(index - 1 >= 0 ? index - 1 : children.length - 1);
      } else {
        setFocusIndex(
          focusIndex - 1 >= 0 ? focusIndex - 1 : children.length - 1
        );
      }
    } else if (e.key === "Enter") {
      console.log(focusIndex);

      if (focusIndex !== null) {
        onSelect(children[focusIndex].props.id);
      }
    }
  };

  if (!tabContext) {
    console.error("TabList component must be use within Tab component");
    return null;
  }

  return (
    <TabListContext.Provider value={true}>
      <div style={{ display: "flex", gap: "5px" }} onKeyDown={keyDownHandler}>
        {Children.map(children, (child, index) => (
          <div
            key={index}
            style={{ border: focusIndex === index ? "2px dashed red" : "" }}
          >
            {child}
          </div>
        ))}
      </div>
    </TabListContext.Provider>
  );
};

Tab.TabItem = ({ id, label, isDisabled }) => {
  const { selectedTabId, onSelect } = useTabDataContext();
  const tabListContext = useContext(TabListContext);

  if (!tabListContext) {
    console.error("TabItem component must be use within TabList component");
    return null;
  }

  return (
    <div
      disabled={isDisabled}
      tabIndex={id === selectedTabId ? 0 : -1}
      style={{
        border: id === selectedTabId ? "2px solid blue" : "",
        backgroundColor: "lightgray",
      }}
      onClick={() => onSelect(id)}
    >
      {label}
    </div>
  );
};

const TabPanelContext = createContext();

Tab.TabPanelList = ({ children }) => {
  const tabContext = useContext(TabContext);

  if (!tabContext) {
    console.error("TabPanelList component must be use within Tab component");
    return null;
  }
  return (
    <TabPanelContext.Provider value={true}>
      <div style={{ width: "100%" }}>{children}</div>
    </TabPanelContext.Provider>
  );
};

Tab.TabPanel = ({ children, id }) => {
  const { selectedTabId } = useTabDataContext();
  const tabPanelContext = useContext(TabPanelContext);

  if (!tabPanelContext) {
    console.error(
      "TabPanel component must be use within TabPanelList component"
    );
    return null;
  }

  return selectedTabId === id ? <div>{children}</div> : null;
};

export default Tab;
