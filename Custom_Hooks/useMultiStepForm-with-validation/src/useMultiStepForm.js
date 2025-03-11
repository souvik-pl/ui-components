import { useState } from "react";

export const useMultiStepForm = (
  formList,
  formData,
  formFields,
  validatorFn
) => {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [formStepValidity, setFormStepValidity] = useState(
    Array(formList.length).fill(true)
  );

  const isLastStep = currentFormIndex === formList.length - 1;
  const isFirstStep = currentFormIndex === 0;

  const nextForm = () => {
    const nextIndex = currentFormIndex + 1;
    if (nextIndex >= formList.length) return;
    setCurrentFormIndex(nextIndex);
  };

  const prevForm = () => {
    const prevIndex = currentFormIndex - 1;
    if (prevIndex < 0) return;
    setCurrentFormIndex(prevIndex);
  };

  const goto = (index) => {
    setCurrentFormIndex(index);
  };

  const onSubmit = (handleSubmit) => (e) => {
    e.preventDefault();

    const newFormStepValidity = [...formStepValidity];

    // Check each form step
    Object.keys(formFields).forEach((stepIndex) => {
      const fieldNames = formFields[stepIndex];
      const stepIsValid = fieldNames.every(
        (field) => !validatorFn(field, formData[field])
      );
      newFormStepValidity[stepIndex] = stepIsValid;
    });
    setFormStepValidity(newFormStepValidity);

    if (newFormStepValidity.every((step) => step === true)) {
      handleSubmit(formData);
    }
  };

  return {
    formList,
    currentFormIndex,
    currentForm: formList[currentFormIndex],
    isFirstStep,
    isLastStep,
    formStepValidity,
    nextForm,
    prevForm,
    goto,
    onSubmit,
  };
};
