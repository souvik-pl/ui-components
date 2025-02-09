import React from "react";
import { Accordion } from "./Accordion";

const ACCORDION_LIST = [
  {
    id: "acc_1",
    title: "Accordion 1",
    content: "Content 1",
  },
  {
    id: "acc_2",
    title: "Accordion 2",
    content: "Content 2",
  },
  {
    id: "acc_3",
    title: "Accordion 3",
    content: "Content 3",
  },
];

const App = () => {
  return (
    <Accordion
      multiOpen={false}
      defaultOpen={["acc_2"]}
      onChange={(openList) => console.log(openList)}
    >
      {ACCORDION_LIST.map((item) => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Trigger>{item.title}</Accordion.Trigger>
          <Accordion.Content>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default App;
