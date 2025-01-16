import React, { useState } from "react";
import SelectSync from "./SelectSync";

const MENU_LIST = [
  {
    label: "Orange",
    value: "orange",
  },
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "Banana",
    value: "banana",
  },
  {
    label: "Grape",
    value: "grape",
  },
  {
    label: "Mango",
    value: "mango",
  },
  {
    label: "Pineapple",
    value: "pineapple",
  },
  {
    label: "Papaya",
    value: "papaya",
  },
  {
    label: "Plum",
    value: "plum",
  },
];

function App() {
  const [value, setValue] = useState([MENU_LIST[0], MENU_LIST[1]]);

  const onSelect = (data) => {
    setValue(data);
  };

  return (
    <SelectSync
      options={MENU_LIST}
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
 * 3. Select on Click and deselect on pressing cross button of the chip ✅
 * 4. Search and Select on click ✅
 * 5. Clear All button ✅
 * 6. Max selection count ✅
 * 7. Open/close dropdown ✅
 * 8. Keyboard functionalities - Up, Down, Enter, Escape, Backspace ✅
 * 9. Handling Compound components errors
 * 10. Positioning of the dropdown list
 */
