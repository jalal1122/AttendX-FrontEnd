import { useSelector } from "react-redux";
import { MdClass } from "react-icons/md";
import { useState } from "react";
import { MdAssignmentTurnedIn } from "react-icons/md";

const NavigationTab = ({ isMenuExtended }) => {
  const colors = useSelector((state) => state.color.colors);

  const tabsIconSize = 28;

  //   Define Tab icon styles
  const tabsIconStyles = "hover:scale-105 hover:cursor-pointer";

  //   teacher Tabs
  const teacherTabs = [
    {
      name: "Classes",
      active: true,
      icon: <MdClass size={tabsIconSize} className={tabsIconStyles} />,
    },
    {
      name: "Attendance Reports",
      active: false,
      icon: (
        <MdAssignmentTurnedIn size={tabsIconSize} className={tabsIconStyles} />
      ),
    },
  ];

  //   student Tabs
  const studentTabs = [
    {
      name: "Tab 4",
      active: true,
      icon: <MdClass size={tabsIconSize} className={tabsIconStyles} />,
    },
    {
      name: "Tab 5",
      active: false,
      icon: <MdClass size={tabsIconSize} className={tabsIconStyles} />,
    },
  ];

  //   role state
  const [role, setRole] = useState("Teacher");

  //   Define button styles
  const buttonsClasses =
    "w-fit text-nowrap p-2 flex items-center justify-start gap-2 rounded-md text-semibold hover:cursor-pointer active:scale-95";

  const renderTabs = () => {
    return (
      <>
        {role === "Teacher"
          ? teacherTabs.map((tab, index) => (
              <button key={index} className={buttonsClasses}>
                {tab?.icon && <span>{tab.icon}</span>}{" "}
                {isMenuExtended && <span>{tab.name}</span>}
              </button>
            ))
          : "height"}
      </>
    );
  };

  return (
    <div
      className={`flex flex-col min-h-full gap-5 p-2 min-w-fit`}
      style={{
        backgroundColor: colors.Background,
        color: colors.Text.Primary,
      }}
    >
      {/* Navigation Tabs */}
      {renderTabs(23)}
    </div>
  );
};

export default NavigationTab;
