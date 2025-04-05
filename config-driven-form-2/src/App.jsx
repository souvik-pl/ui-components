import { useState } from "react";

const config = [
  {
    type: "text",
    name: "username",
    label: "Username",
    validations: {
      required: {
        value: true,
        message: "This field is required",
      },
    },
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    validations: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email",
      },
    },
  },
  {
    type: "radio",
    name: "gender",
    label: "Gender",
    options: ["Male", "Female", "Other"],
    validations: {
      required: {
        value: true,
        message: "This field is required",
      },
    },
  },
  {
    type: "number",
    name: "age",
    label: "Age",
    validations: {
      required: {
        value: true,
        message: "This field is required",
      },
      min: {
        value: 18,
        message: "Age must be between 18 and 100",
      },
      max: {
        value: 100,
        message: "Age must be between 18 and 100",
      },
    },
  },
  {
    type: "checkbox",
    name: "subscribe",
    label: "Subscribe to our newsletter",
  },
];

const FormRenderer = ({ config, handleSubmit }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (config, formValues) => {
    const errorObj = {};

    config.forEach((field) => {
      if (!field.validations) return;

      if (
        field.validations.required &&
        field.validations.required.value &&
        !formValues[field.name]
      ) {
        errorObj[field.name] = field.validations.required.message;
        return;
      }

      if (
        field.validations.pattern &&
        !field.validations.pattern.value.test(formValues[field.name])
      ) {
        errorObj[field.name] = field.validations.pattern.message;
        return;
      }

      if (
        field.validations.min &&
        formValues[field.name] < field.validations.min.value
      ) {
        errorObj[field.name] = field.validations.min.message;
        return;
      }

      if (
        field.validations.max &&
        formValues[field.name] > field.validations.max.value
      ) {
        errorObj[field.name] = field.validations.max.message;
        return;
      }
    });

    console.log(errorObj);

    setErrors(errorObj);

    return Object.entries(errorObj).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate(config, formValues)) {
      handleSubmit(formValues);
    }
  };

  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            type={field.type}
            name={field.name}
            value={formValues[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      case "number":
        return (
          <input
            type={field.type}
            name={field.name}
            value={formValues[field.name] || ""}
            onChange={(e) => handleChange(field.name, Number(e.target.value))}
          />
        );
      case "radio":
        return field.options.map((option) => (
          <label key={option}>
            <input
              type={field.type}
              name={field.name}
              value={option}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
            {option}
          </label>
        ));
      case "checkbox":
        return (
          <input
            type={field.type}
            name={field.name}
            checked={formValues[field.name] || false}
            onChange={(e) => handleChange(field.name, e.target.checked)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {config.map((field) => (
        <label
          key={field.name}
          style={{ display: "block", marginBottom: "10px" }}
        >
          {field.label}: {renderField(field)}
          <p style={{ color: "red" }}>{errors[field.name]}</p>
        </label>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

const App = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return <FormRenderer config={config} handleSubmit={handleSubmit} />;
};

export default App;
