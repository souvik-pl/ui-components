import { createContext, useContext, useState } from "react";

const ITEMS = [
  {
    id: "acc_1",
    title: "Accordion 1",
    content: "Hello from Accordion 1",
  },
  {
    id: "acc_2",
    title: "Accordion 2",
    content: "Hello from Accordion 2",
  },
  {
    id: "acc_3",
    title: "Accordion 3",
    content: "Hello from Accordion 3",
  },
];

const DataContext = createContext();
const AccordionContext = createContext();
const AccordionItemContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within Accordion component");
  }

  return context;
};

const Accordion = ({ children, defaultOpenList, multiOpen, onChange }) => {
  const [openList, setOpenList] = useState(defaultOpenList || []);
  return (
    <DataContext.Provider
      value={{ openList, setOpenList, multiOpen, onChange }}
    >
      <AccordionContext.Provider value={true}>
        <div>{children}</div>
      </AccordionContext.Provider>
    </DataContext.Provider>
  );
};

Accordion.Item = ({ children }) => {
  const context = useContext(AccordionContext);
  if (!context) {
    console.error(
      "Accordion.Item component must be used within Accordion component"
    );
    return null;
  }

  return (
    <AccordionItemContext.Provider value={true}>
      <div>{children}</div>
    </AccordionItemContext.Provider>
  );
};

Accordion.Trigger = ({ children, value }) => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    console.error(
      "Accordion.Trigger component must be used within Accordion.Item component"
    );
    return null;
  }

  const { openList, setOpenList, multiOpen, onChange } = useDataContext();
  const handleTriggerClick = () => {
    let newOpenList = [];
    if (openList.includes(value)) {
      newOpenList = openList.filter((item) => item !== value);
    } else {
      if (multiOpen) {
        newOpenList = [...openList, value];
      } else {
        newOpenList = [value];
      }
    }
    setOpenList(newOpenList);
    onChange?.(newOpenList);
  };

  return <button onClick={handleTriggerClick}>{children}</button>;
};

Accordion.Content = ({ children, value }) => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    console.error(
      "Accordion.Content component must be used within Accordion.Item component"
    );
    return null;
  }

  const { openList } = useDataContext();
  return openList.includes(value) && <div>{children}</div>;
};

function App() {
  return (
    <Accordion
      defaultOpenList={["acc_1"]}
      onChange={(openList) => console.log(openList)}
    >
      {ITEMS.map((item) => (
        <Accordion.Item key={item.id}>
          <Accordion.Trigger value={item.id}>{item.title}</Accordion.Trigger>
          <Accordion.Content value={item.id}>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default App;
