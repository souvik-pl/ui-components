import React from "react";
import MainPage from "./MainPage/MainPage";
import ToastProvider from "./Toast/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <MainPage />
    </ToastProvider>
  );
}

export default App;
