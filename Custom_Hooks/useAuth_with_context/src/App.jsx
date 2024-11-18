import React from "react";
import { useAuth } from "./auth/useAuth";
import AuthContextProvider from "./auth/AuthContextProvider";

function Header() {
  const { isLoggingIn, isAuthenticated, login, logout } = useAuth();

  const handleLogin = () => {
    login("Alice", "Alice@123");
  };

  return (
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
  );
}

function Body() {
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
  return (
    <AuthContextProvider>
      <div>
        <Header />
        <Body />
      </div>
    </AuthContextProvider>
  );
}

export default App;
