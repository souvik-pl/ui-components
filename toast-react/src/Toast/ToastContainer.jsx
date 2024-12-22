import React, { useEffect, useState } from "react";
import { TOAST_EVENT } from "./useToast";

const DEFAULT_DURATION = 5000;

function ToastContainer({ position }) {
  const [toastList, setToastList] = useState([]);

  const handleClose = (id) => {
    const list = toastList.filter((toast) => toast.id !== id);
    console.log(toastList);

    setToastList(list);
  };

  useEffect(() => {
    const handleToastEvent = (e) => {
      setToastList((prev) => [
        ...prev,
        {
          id: e.detail.id,
          message: e.detail.message,
          variant: e.detail.variant,
        },
      ]);

      setTimeout(
        () => {
          handleClose(e.detail.id);
        },
        e.detail.duration ? e.detail.duration : DEFAULT_DURATION
      );
    };

    window.addEventListener(TOAST_EVENT, handleToastEvent);
    return () => {
      window.removeEventListener(TOAST_EVENT, handleToastEvent);
    };
  }, [toastList]);

  const positionStyles = (position) => {
    switch (position) {
      case "top-left":
        return { top: "10px", left: "10px" };
      case "top-right":
        return { top: "10px", right: "10px" };
      case "bottom-left":
        return { bottom: "10px", left: "10px" };
      case "bottom-right":
        return { bottom: "10px", right: "10px" };
      default:
        return {}; // Default styles if position is invalid or not provided
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        ...positionStyles(position),
      }}
    >
      {toastList.map((toast) => {
        switch (toast.variant) {
          case "info":
            return (
              <div
                key={toast.id}
                style={{
                  width: "400px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "lightblue",
                  marginBottom: "10px",
                }}
              >
                {toast.message}
                <button onClick={() => handleClose(toast.id)}>X</button>
              </div>
            );
          case "success":
            return (
              <div
                key={toast.id}
                style={{
                  width: "400px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "lightgreen",
                  marginBottom: "10px",
                }}
              >
                {toast.message}
                <button onClick={() => handleClose(toast.id)}>X</button>
              </div>
            );
          case "error":
            return (
              <div
                key={toast.id}
                style={{
                  width: "400px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "red",
                  marginBottom: "10px",
                }}
              >
                {toast.message}
                <button onClick={() => handleClose(toast.id)}>X</button>
              </div>
            );
          case "warning":
            return (
              <div
                key={toast.id}
                style={{
                  width: "400px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "orange",
                  marginBottom: "10px",
                }}
              >
                {toast.message}
                <button onClick={() => handleClose(toast.id)}>X</button>
              </div>
            );
          default:
            return (
              <div
                key={toast.id}
                style={{
                  width: "400px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "lightgrey",
                  marginBottom: "10px",
                }}
              >
                {toast.message}
                <button onClick={() => handleClose(toast.id)}>X</button>
              </div>
            );
        }
      })}
    </div>
  );
}

export default ToastContainer;
