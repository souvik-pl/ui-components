import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AccordionContext = createContext();

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error(
      "useAccordionContext must be used within Accordion component"
    );
  return context;
};

export const Accordion = ({ children, multiOpen, defaultOpen, onChange }) => {
  const [openList, setOpenList] = useState(defaultOpen ? defaultOpen : []);

  return (
    <AccordionContext.Provider
      value={{ openList, setOpenList, multiOpen, onChange }}
    >
      <div>{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.Item = ({ children, value }) => {
  const { openList, setOpenList, multiOpen, onChange } = useAccordionContext();

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
    <div>
      <button onClick={handleToggle}>{children[0]}</button>
      {openList.includes(value) && children[1]}
    </div>
  );
};

Accordion.Trigger = ({ children }) => {
  return <>{children}</>;
};

Accordion.Content = ({ children }) => {
  return <div>{children}</div>;
};
