import { FiSun, FiMoon } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../../features/color/colorSlice";

const RightSideNav = () => {
  // get the mode from the Redux store
  const mode = useSelector((state) => state.color.mode);

  //   get the colors from the redux store
  const { colors } = useSelector((state) => state.color);

  //   initialize useDispatch
  const dispatch = useDispatch();

  const buttonClasses =
    "rounded-md font-semibold hover:cursor-pointer active:scale-95";

  // Toggle between light and dark mode
  const toggleMode = () => {
    dispatch(changeMode());
  };

  // Function to Render the Light/Dark Theme Toggle Button
  const LightDarkTheme = ({ iconSize }) => (
    <>
      {mode === "light" ? (
        <button className={buttonClasses} onClick={toggleMode}>
          <FiMoon
            size={iconSize}
            style={{
              color: colors.Primary,
              fill: colors.Primary,
            }}
          />
        </button>
      ) : (
        <button className={buttonClasses} onClick={toggleMode}>
          <FiSun
            size={iconSize}
            style={{
              color: "orange",
              fill: "orange",
            }}
          />
        </button>
      )}
    </>
  );

  return (
    <div className="flex gap-3 p-2">
      {/* Profile Picture */}
      <div style={{
        backgroundColor: colors.Text.Secondary,
      }} className="h-8 w-8 rounded-full cursor-pointer"></div>

      {/* Color Theme Icon */}
      {<LightDarkTheme iconSize={32} />}
    </div>
  );
};

export default RightSideNav;
