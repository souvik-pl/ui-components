import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";

//Hooks
const DataContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataContext should be used within Menu component");

  return context;
};

const useLoadOptions = (loadOptions, searchQuery) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await loadOptions(searchQuery);
        setOptions(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  return { options, loading, error };
};

const useDebounce = (searchQuery, delay) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay || 400);

    return () => clearTimeout(timerRef.current);
  }, [searchQuery]);

  return debouncedQuery;
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

// Components
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
  const [inputText, setInputText] = useState("");
  const debouncedInputText = useDebounce(inputText, 400);
  const { placeholder, setSearchQuery, setOpen, value, onSelect } =
    useDataContext();

  useEffect(() => {
    setSearchQuery(debouncedInputText);
  }, [debouncedInputText]);

  const handleInput = (e) => {
    setInputText(e.target.value.trim());
  };

  const handleFocus = () => {
    if (inputText) {
      setOpen(true);
    }
  };

  const handleClearAll = () => {
    onSelect([]);
    setSearchQuery("");
    setInputText("");
  };

  return (
    <div className="menu_search">
      <Menu.Chip />
      <input
        placeholder={placeholder}
        value={inputText}
        onChange={handleInput}
        onFocus={handleFocus}
      />
      {value.length > 0 && <button onClick={handleClearAll}>X</button>}
    </div>
  );
};

Menu.List = ({ children }) => {
  const listRef = useRef();
  const {
    open,
    setOpen,
    onSelect,
    value,
    maxSelectionCount,
    focusIndex,
    setFocusIndex,
    filteredOptions,
    searchQuery,
  } = useDataContext();

  useClickOutside(listRef, () => setOpen(false));

  const handleSelect = (item) => {
    if (maxSelectionCount && value.length >= maxSelectionCount) return;
    onSelect([...value, item]);
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
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [open, filteredOptions, value]);

  return (
    open && (
      <ul ref={listRef} className="menu_dropdown">
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

Menu.Loader = () => {
  return <div className="loading">Loading...</div>;
};

const SelectAsync = ({
  loadOptions,
  value,
  placeholder,
  onSelect,
  maxSelectionCount,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { options, loading, error } = useLoadOptions(loadOptions, searchQuery);
  const [focusIndex, setFocusIndex] = useState(null);

  const valueList = value.map((item) => item.value);

  const filteredOptions = options.filter(
    (item) => !valueList.includes(item.value)
  );

  useEffect(() => {
    setOpen(!!searchQuery);
  }, [searchQuery]);

  return (
    <DataContext.Provider
      value={{
        value,
        placeholder,
        onSelect,
        maxSelectionCount,
        searchQuery,
        setSearchQuery,
        open,
        setOpen,
        focusIndex,
        setFocusIndex,
        filteredOptions,
      }}
    >
      <Menu>
        <Menu.Search />
        <Menu.List>
          {loading ? (
            <Menu.Loader />
          ) : (
            filteredOptions.map((item, index) => (
              <Menu.Item key={index} item={item} />
            ))
          )}
        </Menu.List>
      </Menu>
    </DataContext.Provider>
  );
};

export default SelectAsync;
