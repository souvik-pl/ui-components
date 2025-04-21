import React from "react";
import Sidebar from "../components/Sidebar";

const WithSidebar = ({ children }) => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div style={{ width: "200px", height: "100%" }}>
        <Sidebar />
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          flex: "1",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default WithSidebar;
