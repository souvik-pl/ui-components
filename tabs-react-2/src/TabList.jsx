import { useState, useEffect, useRef, createContext, useContext } from "react";
import "./App.css";

const TabContext = createContext();

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error("it should be used within TabList component");
  return context;
};

export function TabList({ children, selectedTabId, onSelect }) {
  const [value, setValue] = useState(selectedTabId);
  const [focusIndex, setFocusIndex] = useState(null);

  useEffect(() => {
    if (!value) {
      selectTab(children[0].props.id);
    } else {
      selectTab(value);
    }
  }, []);

  const selectTab = (id) => {
    setValue(id);
    onSelect(id);
    const currentIndex = children.findIndex((child) => child.props.id === id);
    setFocusIndex(currentIndex);
  };

  const keydownHandler = (e) => {
    if (e.key === "ArrowRight") {
      setFocusIndex(focusIndex + 1 < children.length ? focusIndex + 1 : 0);
    } else if (e.key === "ArrowLeft") {
      setFocusIndex(focusIndex - 1 >= 0 ? focusIndex - 1 : children.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      if (children[focusIndex].props.disabled) return;
      selectTab(children[focusIndex].props.id);
    }
  };

  return (
    <TabContext.Provider
      value={{ value, setValue, focusIndex, setFocusIndex, selectTab }}
    >
      <div role="tablist" className="tabContainer" onKeyDown={keydownHandler}>
        {children}
      </div>
    </TabContext.Provider>
  );
}

export function Tab({ id, label, disabled, index }) {
  const { value, selectTab, focusIndex } = useTabContext();

  return (
    <div
      role="tab"
      aria-selected={id === value}
      className={`tab ${id === value ? "tab-active" : ""} ${
        index === focusIndex ? "tab-focus" : ""
      } ${disabled ? "tab-disable " : ""}`}
      tabIndex={id === value ? 0 : -1}
      onClick={() => selectTab(id)}
    >
      {label}
    </div>
  );
}
