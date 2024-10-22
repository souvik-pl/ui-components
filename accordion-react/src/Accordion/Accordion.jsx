import React, { useState } from "react";
import { AccordionContext } from "./context";

function Accordion({ children }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div>{children}</div>
    </AccordionContext.Provider>
  );
}

export default Accordion;
