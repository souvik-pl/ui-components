import React from "react";

function Crumb({ children }) {
  return <a tabIndex={0}>{children}</a>;
}

export default Crumb;
