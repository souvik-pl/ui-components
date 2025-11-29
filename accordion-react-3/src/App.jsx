import { createContext, useContext, useState } from "react";

const ITEMS = [
  {
    id: "a1",
    title: "Title 1",
    content: "Content 1",
  },
  {
    id: "a2",
    title: "Title 2",
    content: "Content 2",
  },
  {
    id: "a3",
    title: "Title 3",
    content: "Content 3",
  },
];

const DataContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("DataContext must be used within Accordion component");
  }
  return context;
};

const AccordionContext = createContext();
const AccordionItemContext = createContext();

const Accordion = ({ children, openItems, setOpenItems, multi = true }) => {
  return (
    <DataContext.Provider value={{ openItems, setOpenItems, multi }}>
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
  const { openItems, setOpenItems, multi } = useDataContext();

  const context = useContext(AccordionItemContext);
  if (!context) {
    console.error(
      "Accordion.Trigger component must be used within Accordion.Item component"
    );
    return null;
  }

  const toggleAccordion = () => {
    if (openItems.includes(value)) {
      setOpenItems((prev) => prev.filter((item) => item !== value));
    } else {
      if (multi) {
        setOpenItems((prev) => [...prev, value]);
      } else {
        setOpenItems([value]);
      }
    }
  };

  return (
    <button
      onClick={toggleAccordion}
      aria-expanded={openItems.includes(value)}
      aria-controls={`section-${value}`}
      id={`trigger-${value}`}
    >
      {children}
    </button>
  );
};

Accordion.Content = ({ children, value }) => {
  const { openItems } = useDataContext();
  const context = useContext(AccordionItemContext);
  if (!context) {
    console.error(
      "Accordion.Content component must be used within Accordion.Item component"
    );
    return null;
  }

  return (
    openItems.includes(value) && (
      <div id={`section-${value}`} aria-labelledby={`trigger-${value}`}>
        {children}
      </div>
    )
  );
};

function App() {
  const [openItems, setOpenItems] = useState(["a2"]);

  return (
    <Accordion multi={false} openItems={openItems} setOpenItems={setOpenItems}>
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

/*

<Accordion multi={true} openItems={['a1', 'a2']} onChange={}>
  <Accordion.Item>
    <Accordion.Trigger value={'a1'}></Accordion.Trigger>
    <Accordion.Content value={'a1'}></Accordion.Content>
  </Accordion.Item>
  <Accordion.Item>
    <Accordion.Trigger value={'a2'}></Accordion.Trigger>
    <Accordion.Content value={'a2'}></Accordion.Content>
  </Accordion.Item>
</Accordion>

- Basic UI (following compound component pattern) ✅
- Controlled component ✅
- Compound component restrictions ✅
- Accessibility ✅

*/
