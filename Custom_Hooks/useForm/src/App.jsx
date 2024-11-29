import React from "react";
import useForm from "./useForm";

function App() {
  const initialValues = {
    name: "souvik",
    email: "souvik@gmail.com",
  };

  const validateFn = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required.";
    }
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid.";
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    initialValues,
    validateFn
  );

  const onSubmit = (formData) => {
    console.log(formData);
    resetForm();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Name</p>
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </label>
        <label>
          <p>Email</p>
          <input
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
