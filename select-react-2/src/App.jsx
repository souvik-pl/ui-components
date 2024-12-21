import React, { useState } from "react";
import Select from "./Select/Select";

const OPTIONS = [
  {
    label: "Apple",
    value: "Apple",
  },
  {
    label: "Mango",
    value: "Mango",
  },
  {
    label: "Banana",
    value: "Banana",
  },
  {
    label: "Orange",
    value: "Orange",
  },
];

function App() {
  const [options, setOptions] = useState(OPTIONS);
  const [selectedValue, setSelectedValue] = useState(OPTIONS[0].value);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div style={{ marginLeft: "200px", marginTop: "200px" }}>
      <Select
        options={options}
        value={selectedValue}
        onSelect={handleSelectChange}
      />
    </div>
  );
}

export default App;
