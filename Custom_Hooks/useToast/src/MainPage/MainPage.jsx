import React from "react";
import { useToast } from "../Toast/useToast";

function MainPage() {
  const { toast } = useToast();

  return (
    <div>
      <button onClick={() => toast({ variant: "success", message: "Success" })}>
        Success
      </button>
      <button onClick={() => toast({ variant: "error", message: "Error" })}>
        Error
      </button>
      <button onClick={() => toast({ variant: "warning", message: "Warning" })}>
        Warning
      </button>
      <button onClick={() => toast({ variant: "info", message: "Info" })}>
        Info
      </button>
    </div>
  );
}

export default MainPage;
