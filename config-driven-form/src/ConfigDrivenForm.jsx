import React, { useState } from "react";

function ConfigDrivenForm({ formConfig }) {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input
  };

  // Validation function
  const validateField = (name, value, validations) => {
    if (validations.required && !value) {
      return validations.errorMessage || "This field is required.";
    }
    if (validations.minLength && value.length < validations.minLength) {
      return (
        validations.errorMessage ||
        `Minimum length is ${validations.minLength}.`
      );
    }
    if (validations.pattern && !validations.pattern.test(value)) {
      return validations.errorMessage || "Invalid format.";
    }
    if (validations.min && value < validations.min) {
      return validations.errorMessage || `Minimum value is ${validations.min}.`;
    }
    if (validations.max && value > validations.max) {
      return validations.errorMessage || `Maximum value is ${validations.max}.`;
    }
    return "";
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};
    let isValid = true;

    formConfig.forEach((field) => {
      const error = validateField(
        field.name,
        formValues[field.name],
        field.validations
      );
      if (error) {
        isValid = false;
        formErrors[field.name] = error;
      }
    });

    setErrors(formErrors);
    if (isValid) {
      alert("Form submitted successfully!");
      console.log("Form Data:", formValues);
    }
  };

  // Render form fields based on config
  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "password":
      case "date":
        return (
          <input
            type={field.type}
            name={field.name}
            value={formValues[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      case "radio":
        return field.options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={field.name}
              value={option}
              checked={formValues[field.name] === option}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
            {option}
          </label>
        ));
      case "checkbox":
        return (
          <input
            type="checkbox"
            name={field.name}
            checked={formValues[field.name] || false}
            onChange={(e) => handleChange(field.name, e.target.checked)}
          />
        );
      case "range":
        return (
          <input
            type="range"
            name={field.name}
            min={field.validations.min}
            max={field.validations.max}
            value={formValues[field.name] || field.validations.min}
            onChange={(e) => handleChange(field.name, Number(e.target.value))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formConfig.map((field) => (
        <div key={field.name} style={{ marginBottom: "10px" }}>
          <label>{field.label}:</label>
          {renderField(field)}
          {errors[field.name] && (
            <div style={{ color: "red" }}>{errors[field.name]}</div>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ConfigDrivenForm;
