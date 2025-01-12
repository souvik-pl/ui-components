import React, { useEffect, useRef, useState } from "react";
import "./App.css";

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

const Chip = ({ item, onRemove }) => {
  return (
    <div className="chip">
      {item.label}
      <button onClick={() => onRemove(item.value)}>X</button>
    </div>
  );
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
  const menuRef = useRef();

  useClickOutside(menuRef, () => setOpen(false));

  const valueList = value.map((item) => item.value);

  const filteredOptions = options.filter(
    (item) =>
      !valueList.includes(item.value) && item.value.includes(searchQuery)
  );

  const handleSelect = (item) => {
    if (maxSelectionCount && value.length >= maxSelectionCount) return;
    onSelect([...value, item]);
  };

  const handleRemove = (data) => {
    onSelect(value.filter((item) => item.value !== data));
  };

  const handleClearAll = () => {
    onSelect([]);
    setSearchQuery("");
  };

  const handleInputChange = (e) => {
    if (!open) setOpen(true);
    setSearchQuery(e.target.value.trim());
  };

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
    <div className="menu">
      <div className="menu_search">
        {value.map((item, index) => (
          <Chip key={index} item={item} onRemove={handleRemove} />
        ))}
        <input
          placeholder={placeholder}
          value={searchQuery}
          onFocus={() => setOpen(true)}
          onChange={handleInputChange}
        />
        {value.length > 0 && <button onClick={handleClearAll}>X</button>}
      </div>
      {open && (
        <ul ref={menuRef} className="menu_dropdown">
          {filteredOptions.map((option, index) => (
            <li
              className={`menu_item ${
                focusIndex === index ? "menu_item-active" : ""
              }`}
              key={index}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectSync;
