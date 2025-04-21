import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

const Sidebar = () => {
  return (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "lightgray" }}
    >
      <p>
        <Link to={`/${ROUTES.users.href}`}>Users</Link>
      </p>
      <p>
        <Link to={`/${ROUTES.albums.href}`}>Albums</Link>
      </p>
    </div>
  );
};

export default Sidebar;
