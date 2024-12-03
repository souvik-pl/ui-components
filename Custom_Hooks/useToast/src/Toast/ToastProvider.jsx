import React, { useState, useEffect } from "react";
import { ToastContext } from "./useToast";
import "./Toast.css";

function ToastProvider({ children, position = "top-right", timer = 1000 }) {
  const [toastList, setToastList] = useState([]);

  const toast = ({ variant, message }) => {
    const id = Date.now();
    const newToast = {
      id,
      variant,
      message,
    };
    setToastList((prevToasts) => [...prevToasts, newToast]);
  };

  const handleClose = (id) => {
    const newToastList = toastList.filter((toast) => toast.id !== id);
    setToastList(newToastList);
  };

  const toastColor = (variant) => {
    switch (variant) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "info":
        return "blue";
      case "warning":
        return "orange";
      default:
        return "blue";
    }
  };

  useEffect(() => {
    // Automatically remove the toast after the specified timer
    const timeouts = toastList.map((toast) =>
      setTimeout(() => handleClose(toast.id), timer)
    );

    // Cleanup timeouts on component unmount or when toastList changes
    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, [toastList, timer]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className={`container ${position}`}>
        {toastList.map((toast) => (
          <div
            key={toast.id}
            className="toast"
            style={{ backgroundColor: toastColor(toast.variant) }}
          >
            <span>{toast.message}</span>
            <span className="closeBtn" onClick={() => handleClose(toast.id)}>
              X
            </span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
