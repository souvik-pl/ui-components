import { useState } from "react";

const useForm = (initialValues, validateFn) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    //update the form values
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    if (validateFn) {
      const validationErrors = validateFn(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    onSubmit(values);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
