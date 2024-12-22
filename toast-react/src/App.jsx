import React, { useEffect } from "react";
import { ToastContainer, useToast } from "./Toast";

function App() {
  const toast = useToast();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={() =>
          toast({
            variant: "info",
            message: "Upload started",
          })
        }
      >
        Info
      </button>
      <button
        onClick={() =>
          toast({
            variant: "error",
            message: "Upload Failed",
          })
        }
      >
        Error
      </button>
      <button
        onClick={() =>
          toast({
            variant: "success",
            message: "Upload succeeded",
          })
        }
      >
        Success
      </button>
      <button
        onClick={() =>
          toast({
            variant: "warning",
            message: "Upload params missing",
          })
        }
      >
        Warning
      </button>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;

/**
 * Position - top-left, top-right, bottom-right, bottom-left  ✅
 * Duration - milliseconds
 * Variant - info, error, success, warning
 * close - cross button and duration
 */
