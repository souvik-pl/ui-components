import React from "react";
import { useState } from "react";
import { usePost } from "./usePost";

const App = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const { sendRequest: addUser, isPending: isSubmitting } = usePost({
    url: "https://dummyjson.com/users/add",
    onSuccess: (data) => {
      console.log(data);
      setShowSuccess(true);
    },
    onError: (err) => {
      console.log(err);
      setShowError(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(userDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>User Details</h2>
        <label>First Name: </label>
        <input name="firstName" onChange={handleChange} />
        <br />
        <label>Last Name: </label>
        <input name="lastName" onChange={handleChange} />
        <br />
        <label>Age: </label>
        <input name="age" type="number" onChange={handleChange} />
        <br />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
      {showSuccess && <p>Success</p>}
      {showError && <p>Error</p>}
    </>
  );
};

export default App;
