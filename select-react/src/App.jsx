import React, { useState } from "react";
import Select from "./Select/Select";
import SelectTrigger from "./Select/SelectTrigger";
import SelectMenu from "./Select/SelectMenu";
import SelectItem from "./Select/SelectItem";

function App() {
  const [data, setData] = useState("");
  const updateData = (value) => setData(value);
  return (
    <div style={{ paddingLeft: "100px", paddingTop: "100px" }}>
      {data}
      <Select onSelect={(value) => updateData(value)}>
        <SelectTrigger>Select</SelectTrigger>
        <SelectMenu>
          <SelectItem value={"Apple"} index={0}>
            Apple
          </SelectItem>
          <SelectItem value={"Mango"} index={1}>
            Mango
          </SelectItem>
          <SelectItem value={"Banana"} index={2}>
            Banana
          </SelectItem>
        </SelectMenu>
      </Select>
    </div>
  );
}

export default App;
