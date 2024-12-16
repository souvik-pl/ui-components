import React from "react";
import OTPInput from "./OTPInput/OTPInput";

function App() {
  const changeHandler = (otp) => {
    console.log(otp);
  };

  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <OTPInput length={6} onChange={changeHandler} />
    </div>
  );
}

export default App;
