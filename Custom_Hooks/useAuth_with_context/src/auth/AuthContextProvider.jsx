import React, { useState } from "react";
import { AuthContext } from "./useAuth";

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? true : false;
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = async (username, password) => {
    setIsLoggingIn(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggingIn(false);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoggingIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
