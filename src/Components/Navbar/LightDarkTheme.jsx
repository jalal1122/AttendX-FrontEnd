import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../../features/color/colorSlice.js';
import { FiSun, FiMoon } from "react-icons/fi";

const LightDarkTheme = () => {
  const dispatch = useDispatch();

      const buttonClasses =
        "rounded-md font-semibold hover:cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300";
    
      // Toggle between light and dark mode
      const toggleMode = () => {
        dispatch(changeMode());
      };

      const {mode, colors} = useSelector((state) => state.color);

  // Function to Render the Light/Dark Theme Toggle Button
  const LightDarkTheme = ({ iconSize }) => (
    <button
      className={buttonClasses}
      onClick={toggleMode}
      aria-label="Toggle color theme"
      aria-pressed={mode === "dark"}
      title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
    >
      {mode === "light" ? (
        <FiMoon
          size={iconSize}
          style={{ color: colors.Primary, fill: colors.Primary }}
        />
      ) : (
        <FiSun
          size={iconSize}
          style={{ color: colors.Warning, fill: colors.Warning }}
        />
      )}
    </button>
  );


  return (
    <div>
      {<LightDarkTheme iconSize={32} />}
    </div>
  )
}

export default LightDarkTheme
