import Navbar from "../Components/Navbar/Navbar";
import NavigationTab from "../Components/NavigationTab";
import { useState } from "react";
import { useSelector } from "react-redux";

const Class = () => {
  const { colors } = useSelector((state) => state.color);
  const [extended, setExtended] = useState(false);

  const [activeTab, setActiveTab] = useState("");

  return (
    <>
      <Navbar isMenuExtended={extended} setIsMenuExtended={setExtended} />
      <div className="Main-Container w-full h-[100vh]" style={{
        backgroundColor: colors.Background,
        // color: colors.Text.Primary,
      }}>
        <div className="flex">
        {/* Navigation Tab */}
        <NavigationTab
          isMenuExtended={extended}
          setIsMenuExtended={setExtended}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="flex flex-col m-2 md:flex-row gap-6 w-full h-full p-6" >
          {/* Left Section - Students Table */}
          <div className="flex-1 bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                BSIT 7th Semester - Mobile App Development
              </h2>
              <input
                type="date"
                className="border px-2 py-1 rounded-md"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Student Name</th>
                  <th className="p-2">Roll No.</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>

          {/* Right Section - Summary */}
          <div className="w-full bg-gray-100 md:w-1/3 rounded-2xl shadow p-4">
            <h3 className="text-xl font-bold mb-4">Attendance Summary</h3>
            <ul className="font-medium text-lg">
              <li className="mb-2">Total Students: 60</li>
              <li className="mb-2">Present: 45</li>
              <li className="mb-2">Absent: 15</li>
              <li className="mb-2">Attendance Percentage: 75%</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <button className="mt-5 ml-320 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-black">
          Start Session
        </button>
      </div>
      </div>
    </>
  );
};

export default Class;
