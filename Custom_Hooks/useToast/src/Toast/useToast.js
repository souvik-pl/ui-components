import { createContext, useContext } from "react";

export const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast should used with in ToastProvider component");

  return context;
};
