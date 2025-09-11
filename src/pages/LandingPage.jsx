import Navbar from "../Components/Navbar/Navbar";
import { useSelector } from "react-redux";
import NavigationTab from "../Components/NavigationTab";
import { useState } from "react";
import Classes from "../Components/Classes";

const LandingPage = () => {
  const { colors } = useSelector((state) => state.color);

  //   state for extended menu
  const [isMenuExtended, setIsMenuExtended] = useState(true);

  return (
    <div
      className="flex flex-col gap-0 min-h-screen"
      style={{
        color: colors.Text.Primary,
        backgroundColor: colors.Background,
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
          className="landing-content flex flex-col gap-5 justify-start items-center w-full h-full p-3 rounded-xl"
          style={{
            backgroundColor: colors.Secondary,
          }}
        >
          <h1 className="text-5xl font-bold">Welcome to AttendX</h1>
          
          <Classes />
        </div>

        {/* Button */}
        <button className="fixed bottom-10 right-10 px-3 py-2 rounded-lg font-semibold" style={{
          backgroundColor: colors.Primary,
          color: colors.Text.Primary,
        }}>
          Add Class
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
