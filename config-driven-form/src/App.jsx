import React from "react";
import ConfigDrivenForm from "./ConfigDrivenForm";

const formConfig = [
  {
    name: "username",
    label: "Username",
    type: "text",
    validations: {
      required: true,
      pattern: /^[a-zA-Z0-9]{5,}$/,
      errorMessage:
        "Username should be at least 5 characters long and alphanumeric.",
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    validations: {
      required: true,
      minLength: 6,
      errorMessage: "Password should be at least 6 characters long.",
    },
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: ["Male", "Female", "Other"],
    validations: {
      required: true,
      errorMessage: "Please select a gender.",
    },
  },
  {
    name: "subscribe",
    label: "Subscribe to Newsletter",
    type: "checkbox",
    validations: {
      required: true,
      errorMessage: "You must agree to subscribe to the newsletter.",
    },
  },
  {
    name: "age",
    label: "Age",
    type: "range",
    validations: {
      required: true,
      min: 18,
      max: 100,
      errorMessage: "Age must be between 18 and 100.",
    },
  },
  {
    name: "birthdate",
    label: "Birth Date",
    type: "date",
    validations: {
      required: true,
      errorMessage: "Please select your birth date.",
    },
  },
];

function App() {
  return (
    <div>
      <ConfigDrivenForm formConfig={formConfig} />
    </div>
  );
}

export default App;
