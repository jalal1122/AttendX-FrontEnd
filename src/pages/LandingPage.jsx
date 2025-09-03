import Navbar from "../Components/Navbar/Navbar";
import { useSelector } from "react-redux";
import NavigationTab from "../Components/NavigationTab";
import { useState } from "react";

const LandingPage = () => {
  const { colors } = useSelector((state) => state.color);

  //   state for extended menu
  const [isMenuExtended, setIsMenuExtended] = useState(false);

  return (
    <div
      className="flex flex-col gap-0 min-h-screen"
      style={{
        color: colors.Text.Primary,
      }}
    >
      {/* Rendering Navbar Component */}
      <Navbar
        isMenuExtended={isMenuExtended}
        setIsMenuExtended={setIsMenuExtended}
      />

      <div className="w-full h-[91vh] flex flex-row">
      {/* Navigation Tab */}
      <NavigationTab
        isMenuExtended={isMenuExtended}
        setIsMenuExtended={setIsMenuExtended}
      />

        <div
          className="landing-content w-full h-full p-3 rounded-xl"
          style={{
            backgroundColor: colors.Secondary,
          }}
        >
          <h1>Welcome to AttendX</h1>
          <p>Your one-stop solution for attendance management.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
