import { useEffect } from "react";
import { useState } from "react";

export const useForm = ({ defaultValues, validator }) => {
  const [control, setControl] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const reset = () => {
    setControl(defaultValues);
    setErrors({});
    setIsDirty(false);
    const errorObj = validator(defaultValues);
    setIsValid(Object.keys(errorObj).length === 0);
  };

  const setValue = (fieldName, value) => {
    const newControl = {
      ...control,
      [fieldName]: value,
    };
    const errorObj = validator(newControl);
    setErrors(errorObj);
    setIsValid(Object.keys(errorObj).length === 0);
    setControl(newControl);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newControl = {
      ...control,
      [name]: value,
    };

    setIsDirty(true);
    const errorObj = validator(newControl);
    setErrors(errorObj);
    setIsValid(Object.keys(errorObj).length === 0);
    setControl(newControl);
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    onSubmit(control);
  };

  useEffect(() => {
    const errorObj = validator(control);
    setIsValid(Object.keys(errorObj).length === 0);
  }, [validator, setIsValid]);

  return {
    control,
    errors,
    isValid,
    isDirty,
    reset,
    setValue,
    handleChange,
    handleSubmit,
  };
};
