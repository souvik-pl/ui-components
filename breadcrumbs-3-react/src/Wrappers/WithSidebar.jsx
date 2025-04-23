import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const WithSidebar = ({ children }) => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div style={{ width: "200px", height: "100%" }}>
        <Sidebar />
      </div>
      <div
        style={{
          height: "100%",
          flex: "1",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "8%",
            borderBottom: "1px solid black",
          }}
        >
          <Navbar />
        </div>
        <div
          style={{
            height: "92%",
            display: "flex",
            flex: "1",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default WithSidebar;
