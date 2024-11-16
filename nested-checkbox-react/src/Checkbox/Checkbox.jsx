import React, { useEffect, useRef } from "react";
import { CheckboxState } from "../App";

function Checkbox({ checkbox, handleChange }) {
  const ref = useRef(null);

  useEffect(() => {
    if (checkbox.state === CheckboxState.Checked) {
      ref.current.checked = true;
      ref.current.indeterminate = false;
    } else if (checkbox.state === CheckboxState.Unchecked) {
      ref.current.checked = false;
      ref.current.indeterminate = false;
    } else {
      ref.current.checked = false;
      ref.current.indeterminate = true;
    }
  }, [checkbox]);

  return (
    <div style={{ paddingLeft: "10px" }}>
      <label>
        <input
          ref={ref}
          type="checkbox"
          onChange={() => handleChange(checkbox.id)}
        />
        {checkbox.label}
      </label>
      {checkbox.children.map((cb) => (
        <Checkbox key={cb.id} checkbox={cb} handleChange={handleChange} />
      ))}
    </div>
  );
}

export default Checkbox;
