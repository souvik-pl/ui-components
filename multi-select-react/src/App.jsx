import React, { useState } from "react";
import Select from "./Select/Select";
import SelectTrigger from "./Select/SelectTrigger";
import SelectMenu from "./Select/SelectMenu";
import SelectItem from "./Select/SelectItem";

const itemList = [
  {
    label: "Apple",
    value: "Apple",
  },
  {
    label: "Banana",
    value: "Banana",
  },
  {
    label: "Mango",
    value: "Mango",
  },
  {
    label: "Papaya",
    value: "Papaya",
  },
  {
    label: "Grapes",
    value: "Grapes",
  },
  {
    label: "Orange",
    value: "Orange",
  },
  {
    label: "Pineapple",
    value: "Pineapple",
  },
];

function App() {
  const [selectItemList, setSelectedItemList] = useState(["Apple", "Banana"]);

  const handleSelect = (selectedItems) => {
    console.log(selectedItems);
    setSelectedItemList(selectedItems);
  };

  return (
    <div style={{ paddingLeft: "100px", paddingTop: "100px" }}>
      <Select valueList={selectItemList} onSelect={handleSelect}>
        <SelectTrigger>Select values</SelectTrigger>
        <SelectMenu>
          {itemList.map((item, index) => (
            <SelectItem key={index} value={item.value} index={index}>
              {item.label}
            </SelectItem>
          ))}
        </SelectMenu>
      </Select>
    </div>
  );
}

export default App;
