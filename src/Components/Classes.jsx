import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const classes = [
  {
    name: "Mathematics 101",
    code: "MATH101",
    instructor: "Dr. John Doe",
  },
  {
    name: "Physics 101",
    code: "PHYS101",
    instructor: "Dr. Jane Smith",
  },
  {
    name: "Chemistry 101",
    code: "CHEM101",
    instructor: "Dr. Emily Johnson",
  },
];

const Classes = () => {
  // get the colors from the redux store
  const { colors } = useSelector((state) => state.color);


  return (
    <div className={`flex flex-wrap justify-start items-center w-full gap-3 p-2`}>
      {classes.map((classItem, index) => (
        <Link to={`/class/${classItem.code}`} key={index}>
          <div
            className={`p-2 rounded-md cursor-pointer shadow-md`}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.Text.Secondary;
              e.currentTarget.style.color = colors.Text.Primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.Background;
              e.currentTarget.style.color = colors.Text.Primary;
            }}
            style={{
              backgroundColor: colors.Background,
              width: "200px",
            }}
          >
            <h2>{classItem.name}</h2>
            <p>Code: {classItem.code}</p>
            <p>Instructor: {classItem.instructor}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Classes;
