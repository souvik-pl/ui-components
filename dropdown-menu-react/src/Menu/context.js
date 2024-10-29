import { createContext, useContext } from "react";

export const MenuContext = createContext();

export const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenuContext must be used within a Menu component");
  }

  return context;
};
