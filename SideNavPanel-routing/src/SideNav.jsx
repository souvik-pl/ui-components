import React from "react";
import { NavLink } from "react-router-dom";

const menuConfig = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Profile",
    path: "/profile",
    children: [
      {
        label: "Settings",
        path: "/profile/settings",
        children: [
          {
            label: "General Settings",
            path: "/profile/settings/general",
          },
          {
            label: "Security Settings",
            path: "/profile/settings/security",
          },
        ],
      },
    ],
  },
];

function SideNav() {
  const renderMenu = (menuList) => {
    return menuList.map((menu) => (
      <li key={menu.path}>
        <NavLink
          to={menu.path}
          style={({ isActive }) => ({
            color: isActive ? "teal" : "",
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          {menu.label}
        </NavLink>
        {menu.children && (
          <ul style={{ marginLeft: "10px", listStyle: "none" }}>
            {renderMenu(menu.children)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div style={{ padding: "10px" }}>
      <ul style={{ listStyle: "none" }}>{renderMenu(menuConfig)}</ul>
    </div>
  );
}

export default SideNav;
