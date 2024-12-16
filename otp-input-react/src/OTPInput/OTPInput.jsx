import React, { useRef } from "react";

function OTPInput({ length, onChange }) {
  const inputRefList = useRef(new Array(length).fill(null));

  const focusAndSelectInput = (index) => {
    if (index > inputRefList.current.length - 1 || index < 0) return;
    inputRefList.current[index].focus();
    inputRefList.current[index].select();
  };

  const changeHandler = (e, index) => {
    const value = e.target.value.slice(0, 1);
    e.target.value = value;

    if (value !== "") {
      focusAndSelectInput(index + 1);
    } else {
      focusAndSelectInput(index - 1);
    }

    assembleOTP();
  };

  const assembleOTP = () => {
    const isOTPValid = inputRefList.current.every(
      (input) => input.value !== ""
    );
    if (isOTPValid) {
      const otp = inputRefList.current.reduce(
        (acc, curr) => `${acc}${curr.value}`,
        ""
      );
      onChange(otp);
    }
  };

  return (
    <div>
      {new Array(length).fill(null).map((_, index) => (
        <input
          style={{
            width: "40px",
            height: "40px",
            marginLeft: "10px",
            textAlign: "center",
          }}
          key={index}
          type="number"
          ref={(el) => (inputRefList.current[index] = el)}
          onChange={(event) => changeHandler(event, index)}
        />
      ))}
    </div>
  );
}

export default OTPInput;
