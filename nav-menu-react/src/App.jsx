import { NavMenu, DropdownMenu, MenuLink } from "./NavMenu";

const NAV_MENU = [
  {
    type: "dropdown",
    label: "Product",
    menuList: [
      {
        type: "link",
        label: "Github Co-pilot",
        href: "www.google.com",
      },
      {
        type: "dropdown",
        label: "Security",
        menuList: [
          {
            type: "link",
            label: "Github",
            href: "www.github.com",
          },
          {
            type: "link",
            label: "Instagram",
            href: "www.instagram.com",
          },
          {
            type: "dropdown",
            label: "Resources",
            menuList: [
              {
                type: "link",
                label: "Learning Resources",
                href: "www.udemy.com",
              },
              {
                type: "link",
                label: "Documentation",
                href: "www.docs.github.com",
              },
            ],
          },
        ],
      },
      {
        type: "link",
        label: "Actions",
        href: "www.github.com",
      },
    ],
  },
  {
    type: "dropdown",
    label: "Solutions",
    menuList: [
      {
        type: "link",
        label: "Healthcare",
        href: "www.google.com",
      },
      {
        type: "link",
        label: "Financial Services",
        href: "www.facebook.com",
      },
    ],
  },
  {
    type: "link",
    label: "pricing",
    href: "www.razorpay.com",
  },
];

export default function App() {
  return (
    <div>
      <NavMenu>
        {NAV_MENU.map((menu, index) => {
          if (menu.type === "dropdown") {
            return (
              <DropdownMenu
                key={index}
                label={menu.label}
                menuList={menu.menuList}
              />
            );
          } else {
            return <MenuLink key={index} label={menu.label} href={menu.href} />;
          }
        })}
      </NavMenu>
    </div>
  );
}
