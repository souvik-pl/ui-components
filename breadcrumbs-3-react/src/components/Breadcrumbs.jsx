import React from "react";
import { Children } from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ children }) => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {Children.map(children, (child, index) => (
        <div>
          {child} {index < children.length - 1 ? "/" : ""}
        </div>
      ))}
    </div>
  );
};

Breadcrumbs.Crumb = ({ children, href }) => {
  return <Link to={href}>{children}</Link>;
};

export default Breadcrumbs;
