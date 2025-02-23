import React from "react";
import { useForm } from "./useForm";

const App = () => {
  const validatorFn = (formData) => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    return errors;
  };

  const {
    control,
    errors,
    isValid,
    isDirty,
    reset,
    setValue,
    handleChange,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    validator: validatorFn,
  });

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <h2>User Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name: </label>
        <input name="name" value={control.name} onChange={handleChange} />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        <br />
        <label>Email: </label>
        <input
          name="email"
          type="email"
          value={control.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        <br />
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
      <br />
      <br />
      <p>Form Dirty - {String(isDirty)}</p>
      <p>Form Valid - {String(isValid)}</p>
      <button onClick={reset}>Reset Form</button>
      <button onClick={() => setValue("email", "abcd@com")}>
        Set email to "abcd@com"
      </button>
    </div>
  );
};

export default App;
