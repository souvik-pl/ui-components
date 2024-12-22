import React from "react";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "250px", height: "100%" }}>
        <SideNav />
      </div>
      <div style={{ flex: 1, backgroundColor: "pink" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
