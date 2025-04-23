import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

const BreadcrumbComponent = () => {
  const location = useLocation();

  const directories = location.pathname.split("/").filter(Boolean);

  const breadcrumbList = directories.map((dir, index) => ({
    label: dir,
    href: "/" + directories.slice(0, index + 1).join("/"),
  }));

  console.log(breadcrumbList);

  return (
    <div>
      <Breadcrumbs>
        {breadcrumbList.map((bc) => (
          <Breadcrumbs.Crumb id={bc.href} href={bc.href}>
            {bc.label}
          </Breadcrumbs.Crumb>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbComponent;
