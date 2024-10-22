import { createContext, useContext } from "react";

export const AccordionContext = createContext(undefined);

export function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "useAccordionContext must be used within an Accordion component"
    );
  }
  return context;
}
