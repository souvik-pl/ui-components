import React from "react";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import Crumb from "./Breadcrumbs/Crumb";

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
      <Breadcrumbs>
        {breadcrumbList.map((item) => (
          <Crumb key={item.id}>{item.label}</Crumb>
        ))}
      </Breadcrumbs>
    </div>
  );
}

export default App;
