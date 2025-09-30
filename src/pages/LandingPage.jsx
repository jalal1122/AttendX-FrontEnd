import Navbar from "../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import NavigationTab from "../Components/NavigationTab";
import { useEffect, useState } from "react";
import { FaQrcode } from "react-icons/fa";
import Classes from "../Components/Classes";
import { MdClass } from "react-icons/md";
import { createClass, resetCreateClass } from "../features/class/classSlice.js";

const LandingPage = () => {
  const { colors } = useSelector((state) => state.color);
  const { role: rawRole, user } = useSelector((state) => state.user);
  const role = rawRole || user?.role;

  const dispatch = useDispatch();

  const { createClassLoading, createClassError, createClassSuccess } =
    useSelector((state) => state.class);

  // active tab state
  const [activeTab, setActiveTab] = useState("Classes");

  //  state to show add class form
  const [showRenderAddClass, setShowRenderAddClass] = useState(false);

  //   state for new class modal & input
  const [newClassName, setNewClassName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);

  //   state for extended menu
  const [isMenuExtended, setIsMenuExtended] = useState(true);

  const handleButtonClick = () => {
    if (role === "student") {
      // Students: Scan QR Code (placeholder)
      console.log("Scan QR Code clicked");
    } else if (role === "teacher" || role === "admin") {
      setShowRenderAddClass(true);
    }
  };

  // Close modal on create success
  useEffect(() => {
    if (createClassSuccess) {
      const t = setTimeout(() => {
        setShowRenderAddClass(false);
        setNewClassName("");
        setNameTouched(false);
        dispatch(resetCreateClass());
      }, 600);
      return () => clearTimeout(t);
    }
  }, [createClassSuccess, dispatch]);

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
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div
          className="landing-content flex flex-col gap-5 justify-start items-center w-full h-full p-3 rounded-xl"
          style={{
            backgroundColor: colors.Secondary,
          }}
        >
          <h1 className="text-5xl font-bold flex">Welcome to Attend <p className="text-blue-800">X</p></h1>

          {activeTab === "Classes" ? <Classes setActiveTab={setActiveTab} /> : "height"}
        </div>

        {/* Button */}
        {role === "student" && (
          <button
            className="fixed bottom-10 right-10 flex justify-center items-center hover:cursor-pointer hover:scale-105 transition-transform duration-300 px-3 py-2 rounded-lg font-semibold text-lg"
            style={{
              backgroundColor: colors.Primary,
              color: colors.Text.Primary,
            }}
            onClick={handleButtonClick}
          >
        Scan QR Code <FaQrcode size={20} className="inline-block ml-2" />
        </button>

        )}
         

        {/* Render Add Class Form */}
        {showRenderAddClass && (role === "teacher" || role === "admin") && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowRenderAddClass(false);
                dispatch(resetCreateClass());
              }}
            />
            <div
              className="relative z-10 animate-[fadeIn_200ms_ease]"
              onClick={(e) => e.stopPropagation()}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const valid = newClassName.trim().length >= 3;
                  setNameTouched(true);
                  if (!valid || createClassLoading) return;
                  dispatch(createClass(newClassName.trim()));
                }}
                className="relative w-full max-w-md"
                aria-label="Create class form"
              >
                <div
                  className="flex flex-col gap-4 py-6 px-6 rounded-2xl shadow-2xl border backdrop-blur-md"
                  style={{
                    backgroundColor: colors.Background + "F2",
                    borderColor: colors.Secondary,
                  }}
                >
                  <h2
                    className="text-2xl font-extrabold tracking-tight"
                    style={{ color: colors.Text.Primary }}
                  >
                    Create a new class
                  </h2>

                  <label
                    className="text-sm font-medium"
                    style={{ color: colors.Text.Secondary }}
                    htmlFor="classNameInput"
                  >
                    Class name
                  </label>
                  <input
                    id="classNameInput"
                    type="text"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    placeholder="e.g. Physics 101"
                    className="w-full rounded-lg px-3 py-2 outline-none transition shadow-sm"
                    style={{
                      backgroundColor: colors.Secondary,
                      color: colors.Text.Primary,
                      border: `1px solid ${
                        nameTouched && newClassName.trim().length < 3
                          ? colors.Error
                          : colors.Secondary
                      }`,
                    }}
                  />
                  {nameTouched && newClassName.trim().length < 3 && (
                    <p className="text-sm" style={{ color: colors.Error }}>
                      Please enter at least 3 characters.
                    </p>
                  )}

                  {createClassError && (
                    <p className="text-sm" style={{ color: colors.Error }}>
                      {String(createClassError)}
                    </p>
                  )}

                  {createClassSuccess && (
                    <p className="text-sm" style={{ color: colors.Success }}>
                      Class created successfully!
                    </p>
                  )}

                  <div className="flex gap-3 justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowRenderAddClass(false);
                        setNewClassName("");
                        setNameTouched(false);
                        dispatch(resetCreateClass());
                      }}
                      className="px-4 py-2 rounded-md font-semibold transition-transform active:scale-95"
                      style={{
                        backgroundColor: colors.Secondary,
                        color: colors.Text.Primary,
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        newClassName.trim().length < 3 || createClassLoading
                      }
                      className="px-4 py-2 rounded-md font-semibold hover:scale-105 active:scale-95 transition-transform"
                      style={{
                        backgroundColor: colors.Primary,
                        color: colors.Text.Primary,
                        opacity:
                          newClassName.trim().length < 3 || createClassLoading
                            ? 0.7
                            : 1,
                        cursor:
                          newClassName.trim().length < 3 || createClassLoading
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {createClassLoading ? "Creating…" : "Create Class"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
