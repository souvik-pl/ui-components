import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import "./App.css";

const MENU_ITEMS = [
  {
    id: "1",
    label: "Item 1",
    href: "https://www.google.com",
  },
  {
    id: "2",
    label: "Item 2",
    children: [
      {
        id: "21",
        label: "Item 21",
        href: "https://www.google.com",
      },
      {
        id: "22",
        label: "Item 22",
        href: "https://www.google.com",
      },
      {
        id: "23",
        label: "Item 23",
        href: "https://www.google.com",
      },
    ],
  },
  {
    id: "3",
    label: "Item 3",
    children: [
      {
        id: "31",
        label: "Item 31",
        href: "https://www.google.com",
      },
      {
        id: "32",
        label: "Item 32",
        href: "https://www.google.com",
      },
      {
        id: "33",
        label: "Item 33",
        href: "https://www.google.com",
      },
    ],
  },
];

const DataContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataContext should be used within Dropdown component");
  return context;
};

const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);

  return (
    <DataContext.Provider value={{ open, setOpen, focusIndex, setFocusIndex }}>
      <div
        className="dd"
        onMouseEnter={() => {
          setOpen(true);
          setFocusIndex(null);
        }}
        onMouseLeave={() => {
          setOpen(false);
          setFocusIndex(null);
        }}
      >
        {children}
      </div>
    </DataContext.Provider>
  );
};

Dropdown.Trigger = ({ children }) => {
  const { open, setOpen, setFocusIndex } = useDataContext();
  return (
    <button
      className="trigger menu_item"
      onClick={() => {
        setOpen(!open);
        setFocusIndex(null);
      }}
    >
      {children}
    </button>
  );
};

Dropdown.Menu = ({ children }) => {
  const { open, focusIndex, setFocusIndex } = useDataContext();

  useEffect(() => {
    const handleKeydown = (e) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        if (focusIndex === null) setFocusIndex(0);
        else
          setFocusIndex(focusIndex + 1 < children.length ? focusIndex + 1 : 0);
      } else if (e.key === "ArrowUp") {
        if (focusIndex === null) setFocusIndex(children.length - 1);
        else
          setFocusIndex(
            focusIndex - 1 >= 0 ? focusIndex - 1 : children.length - 1
          );
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open, focusIndex]);

  return (
    open && (
      <ul className="dd_menu">
        {Children.map(children, (child, index) => (
          <li
            key={index}
            className={`dd_li ${
              focusIndex === index ? "menu_item_active" : ""
            }`}
          >
            {child}
          </li>
        ))}
      </ul>
    )
  );
};

Dropdown.MenuItem = ({ label, href }) => {
  return (
    <a href={href} className="dd_menu_item">
      {label}
    </a>
  );
};

const Navbar = ({ menuItems }) => {
  return (
    <nav className="nav">
      {menuItems.map((item) => {
        if (item.href) {
          return (
            <a key={item.id} href={item.href} className="link menu_item">
              {item.label}
            </a>
          );
        } else {
          return (
            <Dropdown key={item.id}>
              <Dropdown.Trigger>{item.label}</Dropdown.Trigger>
              <Dropdown.Menu>
                {item.children.map((child) => (
                  <Dropdown.MenuItem
                    key={child.id}
                    label={child.label}
                    href={child.href}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>
          );
        }
      })}
    </nav>
  );
};

const App = () => {
  return (
    <div className="app">
      <Navbar menuItems={MENU_ITEMS} />
    </div>
  );
};

export default App;
