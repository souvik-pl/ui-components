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
  {
    label: "Pineapple",
    value: "Pineapple",
  },
  {
    label: "Grape",
    value: "Grape",
  },
];

function App() {
  const [optionList, setOptionList] = useState(OPTIONS);
  const [valueList, setValueList] = useState([
    OPTIONS[0].value,
    OPTIONS[1].value,
  ]);

  const handleSelectChange = (value) => {
    setValueList(value);
  };

  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <Select
        valueList={valueList}
        optionList={optionList}
        onSelect={handleSelectChange}
      />
    </div>
  );
}

export default App;
