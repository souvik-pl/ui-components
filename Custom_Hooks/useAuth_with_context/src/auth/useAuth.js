import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthContextProvider component"
    );
  }

  return context;
};

// const useAuth = () => {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? true : false;
//   });
//   const [isLoggingIn, setIsLoggingIn] = useState(false);

//   const login = async (username, password) => {
//     setIsLoggingIn(true);
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     localStorage.setItem("user", JSON.stringify({ username, password }));
//     setIsLoggingIn(false);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return {
//     user,
//     isLoggingIn,
//     isAuthenticated,
//     login,
//     logout,
//   };
// };

// export default useAuth;
