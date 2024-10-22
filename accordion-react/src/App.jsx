import React from "react";
import AccordionItem from "./Accordion/AccordionItem";
import Accordion from "./Accordion/Accordion";

const accordionList = [
  {
    id: "1",
    title: "Accordion Item 1",
    content: "Accordion content 1",
  },
  {
    id: "2",
    title: "Accordion Item 2",
    content: "Accordion content 2",
  },
  {
    id: "3",
    title: "Accordion Item 3",
    content: "Accordion content 3",
  },
];

function App() {
  return (
    <Accordion>
      {accordionList.map((item, index) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          content={item.content}
          index={index}
        />
      ))}
    </Accordion>
  );
}

export default App;
