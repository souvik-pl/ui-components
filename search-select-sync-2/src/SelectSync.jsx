import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";

const DataContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataContext should be used within Menu component");
  return context;
};

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
};

const Menu = ({ children }) => {
  return <div className="menu">{children}</div>;
};

Menu.ChipItem = ({ item, onRemove }) => {
  return (
    <div className="chip">
      {item.label}
      <button onClick={() => onRemove(item.value)}>X</button>
    </div>
  );
};

Menu.Chip = () => {
  const { value, onSelect } = useDataContext();

  const handleRemove = (data) => {
    onSelect(value.filter((item) => item.value !== data));
  };

  return value.map((item, index) => (
    <Menu.ChipItem key={index} item={item} onRemove={handleRemove} />
  ));
};

Menu.Search = () => {
  const {
    placeholder,
    searchQuery,
    setSearchQuery,
    open,
    setOpen,
    value,
    onSelect,
  } = useDataContext();

  const handleInputChange = (e) => {
    if (!open) setOpen(true);
    setSearchQuery(e.target.value.trim());
  };

  const handleClearAll = () => {
    onSelect([]);
    setSearchQuery("");
  };

  return (
    <div className="menu_search">
      <Menu.Chip />
      <input
        placeholder={placeholder}
        value={searchQuery}
        onFocus={() => setOpen(true)}
        onChange={handleInputChange}
      />
      {value.length > 0 && <button onClick={handleClearAll}>X</button>}
    </div>
  );
};

Menu.List = ({ children }) => {
  const {
    open,
    setOpen,
    focusIndex,
    setFocusIndex,
    onSelect,
    maxSelectionCount,
    value,
    filteredOptions,
    searchQuery,
  } = useDataContext();
  const menuRef = useRef();

  const handleSelect = (item) => {
    if (maxSelectionCount && value.length >= maxSelectionCount) return;
    onSelect([...value, item]);
  };

  useClickOutside(menuRef, () => setOpen(false));

  useEffect(() => {
    if (!open) return;

    const handleKeydown = (e) => {
      if (e.key === "ArrowDown") {
        if (focusIndex === null) setFocusIndex(0);
        else
          setFocusIndex(
            focusIndex + 1 < filteredOptions.length ? focusIndex + 1 : 0
          );
      } else if (e.key === "ArrowUp") {
        if (focusIndex === null) setFocusIndex(filteredOptions.length - 1);
        else
          setFocusIndex(
            focusIndex - 1 >= 0 ? focusIndex - 1 : filteredOptions.length - 1
          );
      } else if (e.key === "Escape") {
        setFocusIndex(null);
        setOpen(false);
      } else if (e.key === "Enter") {
        if (focusIndex !== null) {
          handleSelect(filteredOptions[focusIndex]);
          setFocusIndex(null);
        }
      } else if (e.key === "Backspace") {
        if (searchQuery.length === 0 && value.length > 0) {
          onSelect([...value.slice(0, -1)]);
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [open, filteredOptions, value]);

  return (
    open && (
      <ul ref={menuRef} className="menu_dropdown">
        {Children.map(children, (child, index) => (
          <li
            key={index}
            className={`menu_item ${
              focusIndex === index ? "menu_item-active" : ""
            }`}
            onClick={() => handleSelect(child.props.item)}
          >
            {child}
          </li>
        ))}
      </ul>
    )
  );
};

Menu.Item = ({ item }) => {
  return <>{item.label}</>;
};

const SelectSync = ({
  options,
  value,
  maxSelectionCount,
  placeholder,
  onSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);

  const valueList = value.map((item) => item.value);

  const filteredOptions = options.filter(
    (item) =>
      !valueList.includes(item.value) && item.value.includes(searchQuery)
  );

  return (
    <DataContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        open,
        setOpen,
        focusIndex,
        setFocusIndex,
        placeholder,
        value,
        onSelect,
        maxSelectionCount,
        filteredOptions,
      }}
    >
      <Menu>
        <Menu.Search />
        <Menu.List>
          {filteredOptions.map((option, index) => (
            <Menu.Item key={index} item={option} />
          ))}
        </Menu.List>
      </Menu>
    </DataContext.Provider>
  );
};

export default SelectSync;
