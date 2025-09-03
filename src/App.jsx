import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";

function App() {
  useEffect(() => {
    if (localStorage.getItem("mode")) return;
    localStorage.setItem("mode", "light");
  }, []);

  return (
    <>
      <LandingPage />
      {/* <Router /> */}
    </>
  );
}

export default App;
