import React, { useState } from "react";
import { useMultiStepForm } from "./useMultiStepForm";

const Form1 = ({ name, email, updateFields }) => {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => updateFields({ name: e.target.value.trim() })}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => updateFields({ email: e.target.value.trim() })}
          />
        </label>
      </div>
    </>
  );
};

const Form2 = ({ age, phone, updateFields }) => {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Age:{" "}
          <input
            type="number"
            value={age}
            onChange={(e) => updateFields({ age: e.target.value.trim() })}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Phone:{" "}
          <input
            type="number"
            value={phone}
            onChange={(e) => updateFields({ phone: e.target.value.trim() })}
          />
        </label>
      </div>
    </>
  );
};

const Form3 = ({ fatherName, motherName, updateFields }) => {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Father's Name:{" "}
          <input
            type="text"
            value={fatherName}
            onChange={(e) =>
              updateFields({ fatherName: e.target.value.trim() })
            }
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Mother's Name:{" "}
          <input
            type="text"
            value={motherName}
            onChange={(e) =>
              updateFields({ motherName: e.target.value.trim() })
            }
          />
        </label>
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

const App = () => {
  const [data, setData] = useState(initialFormData);

  const updateFields = (field) => {
    setData((prev) => ({ ...prev, ...field }));
  };

  const {
    formList,
    currentFormIndex,
    currentForm,
    isFirstStep,
    isLastStep,
    nextForm,
    prevForm,
  } = useMultiStepForm([
    <Form1 {...data} updateFields={updateFields} />,
    <Form2 {...data} updateFields={updateFields} />,
    <Form3 {...data} updateFields={updateFields} />,
  ]);

  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <div style={{ width: "350px", padding: "10px", border: "1px solid black" }}>
      <div>
        {currentFormIndex + 1} / {formList.length}
      </div>
      <form>
        {currentForm}
        <div style={{ display: "flex", gap: "5px" }}>
          <button type="button" onClick={prevForm} disabled={isFirstStep}>
            Previous
          </button>
          {isLastStep ? (
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <button type="button" onClick={nextForm}>
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default App;
