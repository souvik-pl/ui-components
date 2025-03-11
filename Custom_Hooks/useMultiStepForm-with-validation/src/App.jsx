import React, { useCallback, useState } from "react";
import { useMultiStepForm } from "./useMultiStepForm";

const Form1 = ({
  name,
  email,
  updateFields,
  errors,
  updateErrors,
  validatorFn,
}) => {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => {
              updateFields({ name: e.target.value.trim() });
              const errorMessage = validatorFn("name", e.target.value.trim());
              updateErrors({ name: errorMessage });
            }}
          />
        </label>
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              updateFields({ email: e.target.value.trim() });
              const errorMessage = validatorFn("email", e.target.value.trim());
              updateErrors({ email: errorMessage });
            }}
          />
        </label>
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      </div>
    </>
  );
};

const Form2 = ({
  age,
  phone,
  updateFields,
  errors,
  updateErrors,
  validatorFn,
}) => {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Age:{" "}
          <input
            type="number"
            value={age}
            onChange={(e) => {
              updateFields({ age: e.target.value.trim() });
              const errorMessage = validatorFn("age", e.target.value.trim());
              updateErrors({ age: errorMessage });
            }}
          />
        </label>
        {errors.age && <div style={{ color: "red" }}>{errors.age}</div>}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Phone:{" "}
          <input
            type="number"
            value={phone}
            onChange={(e) => {
              updateFields({ phone: e.target.value.trim() });
              const errorMessage = validatorFn("phone", e.target.value.trim());
              updateErrors({ phone: errorMessage });
            }}
          />
        </label>
        {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
      </div>
    </>
  );
};

const Form3 = ({
  fatherName,
  motherName,
  updateFields,
  errors,
  updateErrors,
  validatorFn,
}) => {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Father's Name:{" "}
          <input
            type="text"
            value={fatherName}
            onChange={(e) => {
              updateFields({ fatherName: e.target.value.trim() });
              const errorMessage = validatorFn(
                "fatherName",
                e.target.value.trim()
              );
              updateErrors({ fatherName: errorMessage });
            }}
          />
        </label>
        {errors.fatherName && (
          <div style={{ color: "red" }}>{errors.fatherName}</div>
        )}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Mother's Name:{" "}
          <input
            type="text"
            value={motherName}
            onChange={(e) => {
              updateFields({ motherName: e.target.value.trim() });
              const errorMessage = validatorFn(
                "motherName",
                e.target.value.trim()
              );
              updateErrors({ motherName: errorMessage });
            }}
          />
        </label>
        {errors.motherName && (
          <div style={{ color: "red" }}>{errors.motherName}</div>
        )}
      </div>
    </>
  );
};

const initialFormData = {
  name: "",
  email: "",
  age: "",
  phone: "",
  fatherName: "",
  motherName: "",
};

// Field validation mapping - which fields belong to which step
const formFieldsMap = {
  0: ["name", "email"],
  1: ["age", "phone"],
  2: ["fatherName", "motherName"],
};

const App = () => {
  const [data, setData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const updateFields = (field) => {
    setData((prev) => ({ ...prev, ...field }));
  };

  const updateErrors = (errorField) => {
    setErrors((prev) => ({ ...prev, ...errorField }));
  };

  const validatorFn = useCallback((field, value) => {
    if (!value) return `${field} is required`;
    // Add specific validations
    switch (field) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email";
        break;
      case "phone":
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value))
          return "Please enter a valid 10-digit phone number";
        break;
      case "age":
        if (isNaN(value) || parseInt(value) < 1)
          return "Please enter a valid age";
        break;
      default:
        break;
    }
    return "";
  }, []);

  const {
    formList,
    currentFormIndex,
    currentForm,
    isFirstStep,
    isLastStep,
    formStepValidity,
    nextForm,
    prevForm,
    goto,
    onSubmit,
  } = useMultiStepForm(
    [
      {
        title: "Step 1",
        component: (
          <Form1
            {...data}
            updateFields={updateFields}
            errors={errors}
            updateErrors={updateErrors}
            validatorFn={validatorFn}
          />
        ),
      },
      {
        title: "Step 2",
        component: (
          <Form2
            {...data}
            updateFields={updateFields}
            errors={errors}
            updateErrors={updateErrors}
            validatorFn={validatorFn}
          />
        ),
      },
      {
        title: "Step 3",
        component: (
          <Form3
            {...data}
            updateFields={updateFields}
            errors={errors}
            updateErrors={updateErrors}
            validatorFn={validatorFn}
          />
        ),
      },
    ],
    data,
    formFieldsMap,
    validatorFn
  );

  const handleSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div style={{ width: "350px", padding: "10px", border: "1px solid black" }}>
      <div
        style={{
          borderBottom: "1px solid black",
          marginBottom: "20px",
          paddingBottom: "5px",
          display: "flex",
          gap: "5px",
        }}
      >
        {formList.map((form, index) => (
          <button
            key={index}
            onClick={() => goto(index)}
            style={{
              border: currentFormIndex === index ? "2px solid black" : "none",
            }}
          >
            {form.title}
            {formStepValidity[index] === false && (
              <span style={{ color: "red", fontWeight: "bold" }}>!</span>
            )}
          </button>
        ))}
      </div>
      <form onSubmit={onSubmit(handleSubmit)}>
        {currentForm.component}
        <div
          style={{
            display: "flex",
            gap: "5px",
            borderTop: "1px solid black",
            paddingTop: "5px",
          }}
        >
          <button type="button" onClick={prevForm} disabled={isFirstStep}>
            Previous
          </button>
          {/* key has been added in button below to avoid react reusing the same button */}
          {isLastStep ? (
            <button key="submit" type="submit">
              Submit
            </button>
          ) : (
            <button key="next" type="button" onClick={nextForm}>
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default App;
