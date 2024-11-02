import { createContext, useContext } from "react";

export const SelectContext = createContext();

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectContext must be used within a Select Component");
  }

  return context;
};
