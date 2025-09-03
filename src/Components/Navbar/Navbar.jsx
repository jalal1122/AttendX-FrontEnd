import { useSelector } from "react-redux";
import RightSideNav from "./RightSideNav";
import { FiMenu } from "react-icons/fi";

const Navbar = ({ isMenuExtended, setIsMenuExtended }) => {
  //   const mode = useSelector((state) => state.color.mode);
  const colors = useSelector((state) => state.color.colors);

  return (
    <>
      <div className="h-[9vh] flex justify-between items-center p-2" style={{
        backgroundColor: colors.Background,
        color: colors.Text.Primary,
      }}>
        <div className="flex items-center gap-3">
          {/* Navigation Icon */}
          <div>
            <button
              className="w-fit text-nowrap p-2 flex items-center justify-start gap-2 rounded-md text-semibold hover:cursor-pointer active:scale-95"
              onClick={() => setIsMenuExtended(!isMenuExtended)}
            >
              <FiMenu size={28} />
            </button>
          </div>

          {/* Heading */}
          <h1
            className="text-2xl font-bold"
            style={{
              color: colors.Text.Primary,
            }}
          >
            AttendX
          </h1>
        </div>

        {/* Right Side Nav */}
        <RightSideNav />
      </div>
    </>
  );
};

export default Navbar;
