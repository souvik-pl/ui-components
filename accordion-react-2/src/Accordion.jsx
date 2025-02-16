import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const DataContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error(
      "useAccordionContext must be used within Accordion component"
    );
  return context;
};

const AccordionContext = createContext();
const AccordionItemContext = createContext();

export const Accordion = ({ children, multiOpen, defaultOpen, onChange }) => {
  const [openList, setOpenList] = useState(defaultOpen ? defaultOpen : []);

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

Accordion.Item = ({ children, value }) => {
  const { openList, setOpenList, multiOpen, onChange } = useDataContext();
  const accordionContext = useContext(AccordionContext);

  if (!accordionContext) {
    console.error(
      "Accordion.Item component must be used within Accordion component"
    );
    return null;
  }

  const handleToggle = () => {
    let newList = [];
    if (multiOpen) {
      if (openList.includes(value)) {
        newList = openList.filter((item) => item !== value);
      } else {
        newList = [...openList, value];
      }
    } else {
      if (openList.includes(value)) {
        newList = [];
      } else {
        newList = [value];
      }
    }
    setOpenList(newList);
    onChange(newList);
  };

  return (
    <AccordionItemContext.Provider value={true}>
      <div>
        <button onClick={handleToggle}>{children[0]}</button>
        {openList.includes(value) && children[1]}
      </div>
    </AccordionItemContext.Provider>
  );
};

Accordion.Trigger = ({ children }) => {
  const accordionItemContext = useContext(AccordionItemContext);

  if (!accordionItemContext) {
    console.error(
      "Accordion.Trigger component must be used within Accordion.Item component"
    );
    return null;
  }
  return <>{children}</>;
};

Accordion.Content = ({ children }) => {
  const accordionItemContext = useContext(AccordionItemContext);

  if (!accordionItemContext) {
    console.error(
      "Accordion.Content component must be used within Accordion.Item component"
    );
    return null;
  }
  return <div>{children}</div>;
};
