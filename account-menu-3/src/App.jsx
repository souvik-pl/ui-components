import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import "./App.css";

const MENU_ITEMS = [
  {
    label: "Profile",
    handler: () => console.log("Profile"),
  },
  {
    label: "Settings",
    handler: () => console.log("Settings"),
  },
  {
    label: "Docs",
    handler: () => console.log("Docs"),
  },
  {
    label: "Files",
    handler: () => console.log("Files"),
  },
  {
    label: "Sheets",
    handler: () => console.log("Sheets"),
  },
  {
    label: "Logout",
    handler: () => console.log("Logout"),
  },
];

const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handler]);
};

const DataContext = createContext();
const MenuContext = createContext();
const MenuContentContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("DataContext should be within Menu component");
  }
  return context;
};

const Menu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);
  const triggerRef = useRef();

  return (
    <DataContext.Provider
      value={{ open, setOpen, focusIndex, setFocusIndex, triggerRef }}
    >
      <MenuContext.Provider value={true}>
        <div className="menu">{children}</div>
      </MenuContext.Provider>
    </DataContext.Provider>
  );
};

Menu.Trigger = ({ children }) => {
  const { setOpen, triggerRef } = useDataContext();
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    console.error("Menu.Trigger should be used within Menu");
    return null;
  }

  return (
    <button
      ref={triggerRef}
      onClick={() => setOpen((prev) => !prev)}
      onMouseDown={(e) => e.stopPropagation()}
      aria-controls="dd-content"
      id="dd-trigger"
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      {children}
    </button>
  );
};

Menu.Content = ({ children }) => {
  const { open, setOpen, focusIndex, setFocusIndex, triggerRef } =
    useDataContext();
  const [contentPosition, setContentPosition] = useState({
    x: "right",
    y: "down",
  });
  const contentRef = useRef();
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    console.error("Menu.Content should be used within Menu");
    return null;
  }

  useOutsideClick(contentRef, () => {
    setOpen(false);
    setFocusIndex(null);
  });

  const scrollToFocused = useCallback((focusIndex) => {
    const el = document.getElementById(`item-${focusIndex}`);
    if (el) el.scrollIntoView({ block: "nearest" });
  }, []);

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    let top = triggerRect.bottom + window.scrollY;
    let left = triggerRect.left + window.scrollX;

    // If menu overflows right side → open leftward
    let posX = "right";
    if (left + contentRect.width > window.innerWidth) {
      posX = "left";
    }

    // If menu overflows bottom → open upward
    let posY = "down";
    if (top + contentRect.height > window.innerHeight + window.scrollY) {
      posY = "up";
    }

    setContentPosition({
      x: posX,
      y: posY,
    });
  }, [open, triggerRef, setContentPosition]);

  useEffect(() => {
    if (!open) return;

    const handleKeydown = (e) => {
      if (e.key === "ArrowDown") {
        let highlightedIndex = 0;
        if (focusIndex === null) {
          highlightedIndex = 0;
        } else if (focusIndex + 1 < children.length) {
          highlightedIndex = focusIndex + 1;
        } else {
          highlightedIndex = 0;
        }
        setFocusIndex(highlightedIndex);
        scrollToFocused(highlightedIndex);
      } else if (e.key === "ArrowUp") {
        let highlightedIndex = children.length - 1;
        if (focusIndex === null) {
          highlightedIndex = children.length - 1;
        } else if (focusIndex - 1 >= 0) {
          highlightedIndex = focusIndex - 1;
        } else {
          highlightedIndex = children.length - 1;
        }
        setFocusIndex(highlightedIndex);
        scrollToFocused(highlightedIndex);
      } else if (e.key === "Enter") {
        e.preventDefault(); // Without this, the dropdown doesn't close
        children[focusIndex].props.onClick();
        setOpen(false);
        setFocusIndex(null);
      } else if (e.key === "Escape") {
        setOpen(false);
        setFocusIndex(null);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open, focusIndex, setFocusIndex, scrollToFocused]);

  return (
    open && (
      <ul
        id="dd-content"
        aria-labelledby="dd-trigger"
        ref={contentRef}
        className="menu_content"
        style={{
          [contentPosition.y === "up" ? "bottom" : "top"]: "100%",
          [contentPosition.x === "left" ? "right" : "left"]: "0",
        }}
      >
        <MenuContentContext.Provider value={true}>
          {Children.map(children, (child, index) => (
            <li
              key={index}
              id={`item-${index}`}
              role="option"
              className={
                focusIndex === index
                  ? "menu_item menu_item-focused"
                  : "menu_item"
              }
              onClick={child.props.onClick}
            >
              {child}
            </li>
          ))}
        </MenuContentContext.Provider>
      </ul>
    )
  );
};

Menu.Item = ({ children, onClick }) => {
  const menuContentContext = useContext(MenuContentContext);
  if (!menuContentContext) {
    console.error("Menu.Item should be used within Menu.Content");
    return null;
  }

  return <>{children}</>;
};

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Menu>
        <Menu.Trigger>Account</Menu.Trigger>
        <Menu.Content>
          {MENU_ITEMS.map((item, index) => (
            <Menu.Item key={index} onClick={item.handler}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu>
    </div>
  );
}

export default App;

/*

<Menu>
  <Menu.Trigger></Menu.Trigger>
  <Menu.Content>
    <Menu.Item></Menu.Item>
    <Menu.Item></Menu.Item>
    <Menu.Item></Menu.Item>
  </Menu.Content>
</Menu>

- Basic UI (following compound component pattern) ✅
- Open/close ✅
- Click outside close ✅
- Keyboard nav ✅
- Esc close ✅
- Press enter to click ✅
- Compound component restrictions ✅
- Positioning ✅
- Accessibility ✅

*/
