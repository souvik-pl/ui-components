import { useState } from "react";

export const useMultiStepForm = (formList) => {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
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

  return {
    formList,
    currentFormIndex,
    currentForm: formList[currentFormIndex],
    isFirstStep,
    isLastStep,
    nextForm,
    prevForm,
  };
};
