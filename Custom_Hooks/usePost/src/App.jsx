import React, { useState } from "react";
import usePost from "./usePost";

function App() {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    age: "",
  });

  const { data, loading, error, sendPostRequest } = usePost(
    "https://dummyjson.com/users/add"
  );

  function submitHandler(e) {
    e.preventDefault();
    sendPostRequest({
      firstName: formValues.firstname,
      lastName: formValues.lastname,
      age: formValues.age,
    });
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          <p>First Name</p>
          <input
            type="text"
            value={formValues.firstname}
            onChange={(e) =>
              setFormValues({ ...formValues, firstname: e.target.value.trim() })
            }
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            type="text"
            value={formValues.lastname}
            onChange={(e) =>
              setFormValues({ ...formValues, lastname: e.target.value.trim() })
            }
          />
        </label>
        <label>
          <p>Age</p>
          <input
            type="number"
            value={formValues.age}
            onChange={(e) =>
              setFormValues({ ...formValues, age: e.target.value.trim() })
            }
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Sending values...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data)}</pre>}
    </div>
  );
}

export default App;
