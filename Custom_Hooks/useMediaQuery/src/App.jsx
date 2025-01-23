import useMediaQuery from "./useMediaQuery";

const App = () => {
  const isMobile = useMediaQuery("(max-width: 450px)");

  return isMobile ? "Mobile View" : "Desktop View";
};

export default App;
