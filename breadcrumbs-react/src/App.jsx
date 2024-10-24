import React from "react";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

const breadcrumbList = [
  {
    id: "1",
    label: "Home",
  },
  {
    id: "2",
    label: "Products",
  },
  {
    id: "3",
    label: "Documents",
  },
  {
    id: "4",
    label: "My Document",
  },
  {
    id: "5",
    label: "Download",
  },
];

function App() {
  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <Breadcrumbs list={breadcrumbList} />
    </div>
  );
}

export default App;
