import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext should be used within Tabs component");
  }

  return context;
};

const Tabs = ({ children, selectedTab, onSelect }) => {
  const [focusIndex, setFocusIndex] = useState(); //number | undefined

  return (
    <DataContext.Provider
      value={{ selectedTab, onSelect, focusIndex, setFocusIndex }}
    >
      <div>{children}</div>
    </DataContext.Provider>
  );
};

Tabs.TabTriggerList = ({ children }) => {
  const { selectedTab, onSelect, focusIndex, setFocusIndex } = useDataContext();

  useEffect(() => {
    if (!selectedTab) {
      onSelect(children[0].props.triggerFor); // Select 1st tab if no tab is selected by default
      setFocusIndex(0);
    }
  }, [selectedTab, children, onSelect]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        let newIndex = focusIndex;
        do {
          newIndex = (newIndex + 1) % children.length;
        } while (children[newIndex].props.disabled);
        setFocusIndex(newIndex);
      } else if (e.key === "ArrowLeft") {
        let newIndex = focusIndex;
        do {
          newIndex = (newIndex - 1 + children.length) % children.length;
        } while (children[newIndex].props.disabled);
        setFocusIndex(newIndex);
      } else if (e.key === "Enter") {
        onSelect(children[focusIndex].props.triggerFor);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onSelect, children, focusIndex, setFocusIndex]);

  const clickHandler = (triggerFor, index) => {
    onSelect(triggerFor);
    setFocusIndex(index);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {Children.map(children, (child, index) => (
        <button
          key={index}
          onClick={() => clickHandler(child.props.triggerFor, index)}
          disabled={child.props.disabled}
          style={{
            backgroundColor:
              selectedTab === child.props.triggerFor ? "lightblue" : "white",
            border: focusIndex === index ? "2px solid blue" : "1px solid black",
          }}
        >
          {child}
        </button>
      ))}
    </div>
  );
};

Tabs.TabTrigger = ({ children, triggerFor, disabled }) => {
  return <>{children}</>;
};

Tabs.TabPanelList = ({ children }) => {
  return <div>{children}</div>;
};

Tabs.Panel = ({ children, value }) => {
  const { selectedTab } = useDataContext();
  return selectedTab === value && <div>{children}</div>;
};

function App() {
  const [selectedTab, setSelectedTab] = useState(); //string | undefined

  const handleSelect = (value) => {
    setSelectedTab(value);
    console.log(value);
  };

  return (
    <Tabs selectedTab={selectedTab} onSelect={handleSelect}>
      <Tabs.TabTriggerList>
        <Tabs.TabTrigger triggerFor={"t1"}>Tab 1</Tabs.TabTrigger>
        <Tabs.TabTrigger triggerFor={"t2"}>Tab 2</Tabs.TabTrigger>
        <Tabs.TabTrigger triggerFor={"t3"}>Tab 3</Tabs.TabTrigger>
        <Tabs.TabTrigger triggerFor={"t4"} disabled={true}>
          Tab 4
        </Tabs.TabTrigger>
      </Tabs.TabTriggerList>
      <Tabs.TabPanelList>
        <Tabs.Panel value={"t1"}>
          <h2>Content 1</h2>
        </Tabs.Panel>
        <Tabs.Panel value={"t2"}>
          <h2>Content 2</h2>
        </Tabs.Panel>
        <Tabs.Panel value={"t3"}>
          <h2>Content 3</h2>
        </Tabs.Panel>
        <Tabs.Panel value={"t4"}>
          <h2>Content 4</h2>
        </Tabs.Panel>
      </Tabs.TabPanelList>
    </Tabs>
  );
}

export default App;

/**
 * Basic component structure ✅
 * Disabled tabs ✅
 * Controlled component ✅
 * Click to view Tab content ✅
 * Keyboard navigation ✅
 */
