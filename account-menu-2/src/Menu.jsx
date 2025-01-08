import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Menu.css";

const DataContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataContext should be used within Menu component");
  return context;
};

const MenuContext = createContext();
const MenuListContext = createContext();

const Menu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);

  return (
    <DataContext.Provider
      value={{ isOpen, setIsOpen, focusIndex, setFocusIndex }}
    >
      <MenuContext.Provider value={true}>
        <div className="menu">{children}</div>
      </MenuContext.Provider>
    </DataContext.Provider>
  );
};

Menu.Trigger = ({ children }) => {
  const menuContext = useContext(MenuContext);
  const { isOpen, setIsOpen } = useDataContext();

  if (!menuContext) {
    console.error("Menu.Trigger component must be used within Menu component");
    return null;
  }

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {children}
    </button>
  );
};

Menu.List = ({ children }) => {
  const menuContext = useContext(MenuContext);
  const { isOpen, setIsOpen, focusIndex, setFocusIndex } = useDataContext();
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (!isOpen) return;

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
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setFocusIndex(null);
      } else if (e.key === "Enter") {
        e.preventDefault(); // this is an important line. Try pressing enter by commenting this line
        children[focusIndex].props.handleOnClick();
        setIsOpen(false);
        setFocusIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, focusIndex]);

  if (!menuContext) {
    console.error("Menu.List component must be used within Menu component");
    return null;
  }

  return (
    isOpen && (
      <MenuListContext.Provider value={true}>
        <ul ref={ref} className="menu_list">
          {Children.map(children, (child, index) => (
            <li
              className={`menu_item ${
                focusIndex === index ? "menu_item-active" : ""
              }`}
              key={index}
            >
              {child}
            </li>
          ))}
        </ul>
      </MenuListContext.Provider>
    )
  );
};

Menu.Item = ({ children, handleOnClick }) => {
  const menuListContext = useContext(MenuListContext);
  const { setIsOpen, setFocusIndex } = useDataContext();

  if (!menuListContext) {
    console.error(
      "Menu.Item component must be used within Menu.List component"
    );
    return null;
  }

  return (
    <div
      onClick={() => {
        handleOnClick();
        setIsOpen(false);
        setFocusIndex(null);
      }}
    >
      {children}
    </div>
  );
};

export default Menu;
