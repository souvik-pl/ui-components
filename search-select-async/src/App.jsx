import React, { useState } from "react";
import SelectAsync from "./SelectAsync";

const MENU_LIST = [
  {
    label: "Orange",
    id: "orange",
    description: "Orange is orange in color",
  },
  {
    label: "Apple",
    id: "apple",
    description: "Apple is red in color",
  },
  {
    label: "Banana",
    id: "banana",
    description: "Banana is yellow in color",
  },
  {
    label: "Grape",
    id: "grape",
    description: "Grape is yellow in color",
  },
  {
    label: "Mango",
    id: "mango",
    description: "Mango is yellow in color",
  },
  {
    label: "Pineapple",
    id: "pineapple",
    description: "Pineapple is green in color",
  },
  {
    label: "Papaya",
    id: "papaya",
    description: "Papaya is green in color",
  },
  {
    label: "Plum",
    id: "plum",
    description: "Plum is pink in color",
  },
];

function App() {
  const [value, setValue] = useState([
    { label: "Potato", value: "potato" },
    { label: "Onion", value: "onion" },
  ]);

  const loadOptions = (query) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredOptions = MENU_LIST.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        ).map((item) => ({ label: item.label, value: item.id }));

        resolve(filteredOptions);
      }, 400);
    });
  };

  const onSelect = (data) => {
    setValue(data);
  };

  return (
    <SelectAsync
      loadOptions={loadOptions}
      value={value}
      placeholder="Search and select"
      onSelect={onSelect}
      maxSelectionCount={5}
    />
  );
}

export default App;

/**
 * 1. Define data and basic Component structure. ✅
 * 2. Basic UI - Input box, Chip, and dropdown menu ✅
 * 3. Hooks - useDebounce, useLoadOptions, useDataContext, useClickOutside ✅
 * 4. Select on Click and deselect on pressing cross button of the chip ✅
 * 5. Search and Select on click ✅
 * 6. Clear All button ✅
 * 7. Max selection count ✅
 * 8. Open/close dropdown ✅
 * 9. Keyboard functionalities - Up, Down, Enter, Escape ✅
 * 10. Handling Compound components errors ✅
 * 11. Positioning of the dropdown list
 */
