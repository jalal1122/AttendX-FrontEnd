import { useEffect } from "react";
import Router from "./Router/Router";

function App() {
  useEffect(() => {
    if (localStorage.getItem("mode")) return;
    localStorage.setItem("mode", "light");
  }, []);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
