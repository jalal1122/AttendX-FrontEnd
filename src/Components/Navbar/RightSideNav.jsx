import { FiSun, FiMoon } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../../features/color/colorSlice.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/user/userSlice.js";

const RightSideNav = () => {
  // get the mode from the Redux store
  const mode = useSelector((state) => state.color.mode);

  //   get the colors from the redux store
  const { colors } = useSelector((state) => state.color);

  const { user } = useSelector((state) => state.user);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  //   initialize useDispatch
  const dispatch = useDispatch();

  const buttonClasses =
    "rounded-md font-semibold hover:cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300";

  // Toggle between light and dark mode
  const toggleMode = () => {
    dispatch(changeMode());
  };

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  const userDropDown = () => {
    const userItems = [
      {
        name: "Profile",
        action: () => {
          navigate("/user/profile");
        },
      },
      {
        name: "Logout",
        action: () => {
          dispatch(logoutUser());
        },
      },
    ];
    const userItemsClasses = "p-2 cursor-pointer border-b last:border-0";

    return (
      <ul
        className="absolute right-0 mt-2 w-36 font-semibold text-lg rounded-md shadow-lg py-2 z-50 flex gap-2 flex-col text-center"
        style={{ backgroundColor: colors.Background }}
      >
        {userItems.map((item, index) => (
          <li
            key={index}
            className={userItemsClasses}
            style={{
              color: colors.Text.Primary,
              backgroundColor: colors.Background,
            }}
            onClick={(e) => {
              e.stopPropagation();
              item.action();
              setShowUserMenu(false);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.Secondary;
              e.currentTarget.style.color = colors.Text.Primary;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = colors.Background;
              e.currentTarget.style.color = colors.Text.Primary;
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  };

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
    <div className="flex gap-3 p-2">
      {/* Profile Picture */}
      <div
        className="h-8 w-8 rounded-full cursor-pointer relative"
        ref={menuRef}
      >
        {user && (
          <>
            <button
              onClick={() => setShowUserMenu((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={showUserMenu}
            >
              <img
                src="https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
                alt="Profile"
                className="h-8 w-8 rounded-full hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
              />
            </button>
            {showUserMenu && userDropDown()}
          </>
        )}
      </div>

      {/* Color Theme Icon */}
      {<LightDarkTheme iconSize={32} />}
    </div>
  );
};

export default RightSideNav;
