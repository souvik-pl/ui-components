import { createContext, useContext, useEffect, useState } from "react";

const RouterContext = createContext();

const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a Router component");
  }
  return context;
};

const Router = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  // Listen to Back/Forward
  useEffect(() => {
    const handlePop = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

const Route = ({ path, element }) => {
  const { path: currentPath } = useRouter();

  return currentPath === path ? element : null;
};

const Link = ({ to, children }) => {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

const Home = () => <h2>🏠 Home Page</h2>;
const About = () => <h2>ℹ️ About Page</h2>;
const User = () => <h2>👤 User Profile</h2>;

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/user">User</Link>
      </nav>

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/user" element={<User />} />
    </Router>
  );
}

export default App;
