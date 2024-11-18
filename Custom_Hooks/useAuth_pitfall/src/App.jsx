import React from "react";
import useAuth from "./useAuth";

// When Comp renders, it uses its own instance of useAuth. The changes in isAuthenticated
// from App's useAuth instance are not reflected in Comp's useAuth instance because they are separate.
// To solve this problem, we need to use Context API.
function Comp() {
  const { user, isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <div>
      <h1>Home Page</h1>
      {isAuthenticated ? (
        <pre>{JSON.stringify(user, null, 4)}</pre>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
function App() {
  const { isLoggingIn, isAuthenticated, login, logout } = useAuth();

  const handleLogin = () => {
    login("Alice", "Alice@123");
  };

  return (
    <div>
      <div>
        Hi there{" "}
        {isAuthenticated ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={handleLogin} disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in" : "Login"}
          </button>
        )}
      </div>
      <Comp />
    </div>
  );
}

export default App;
