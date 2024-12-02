import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

function createResource(fetchFn) {
  let status = "pending";
  let result;

  const promise = fetchFn()
    .then((data) => {
      result = data;
      status = "success";
    })
    .catch((err) => {
      result = err;
      status = "error";
    });

  return {
    read() {
      if (status === "pending") throw promise;
      if (status === "error") throw result;
      return result;
    },
  };
}

async function fetchUser() {
  let data;
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    data = await response.json();
  } catch (error) {
    throw error;
  }

  return data;

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ name: "John" });
  //   }, 1500);
  // });
}

const userResource = createResource(fetchUser);

function User() {
  const user = userResource.read();

  return (
    <div>
      <p>Username: {user.name}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <User />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
