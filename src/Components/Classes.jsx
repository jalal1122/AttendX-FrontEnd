import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  getClasses,
  getJoinedClasses,
  joinClass,
} from "../features/class/classSlice.js";
import ClassCard from "./class-list/ClassCard.jsx";
import ClassSkeleton from "./class-list/ClassSkeleton.jsx";
import EmptyState from "./class-list/EmptyState.jsx";
import JoinClassModal from "./class-list/JoinClassModal.jsx";

const Classes = () => {
  // get the colors from the redux store
  const { colors } = useSelector((state) => state.color);
  const { role: rawRole, user } = useSelector((state) => state.user);
  const role = rawRole || user?.role;

  const [errorMessage, setErrorMessage] = useState("");

  const {
    isError,
    Loading,
    message,
    classes: teacherClasses,
    joinedClasses,
    joinClassesLoading,
    joinClassesError,
  } = useSelector((state) => state.class);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      setErrorMessage(message || "An error occurred while fetching classes.");
    } else {
      setErrorMessage("");
    }
  }, [isError, message]);

  // Fetch data based on role
  useEffect(() => {
    if (role === "teacher" || role === "admin") {
      if (!teacherClasses) dispatch(getClasses());
    } else if (role === "student") {
      if (!joinedClasses) dispatch(getJoinedClasses());
    }
  }, []);

  const loading =
    Boolean(Loading) || (role === "student" && Boolean(joinClassesLoading));
  const items = useMemo(() => {
    if (role === "teacher" || role === "admin") return teacherClasses || [];
    if (role === "student") return joinedClasses || [];
    return [];
  }, [teacherClasses, joinedClasses, role]);

  // Join modal
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <>
      {role === "student" && items.length > 0 && (
        <div className="">
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={() => setShowJoinModal(true)}
          >
            Join Class
          </button>
        </div>
      )}
      <div className="w-full p-2">
        {errorMessage && (
          <div
            className="mb-3 rounded-md px-3 py-2 text-sm font-medium"
            style={{
              backgroundColor: colors.Error + "1A",
              color: colors.Error,
            }}
          >
            {errorMessage}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ClassSkeleton key={i} colors={colors} />
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <EmptyState
            colors={colors}
            title={role === "student" ? "No joined classes" : "No classes yet"}
            subtitle={
              role === "student"
                ? "You haven't joined any classes yet. Join a class using the class code."
                : "You don't have any classes yet. Create a class to get started."
            }
            actionLabel={role === "student" ? "Join a class" : undefined}
            onAction={
              role === "student" ? () => setShowJoinModal(true) : undefined
            }
          />
        )}

        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((classItem, index) => {
              const title =
                classItem.className || classItem.name || "Untitled Class";
              const code =
                classItem.classCode ||
                classItem.code ||
                classItem.class_code ||
                "";
              const teacherName =
                classItem.teacher?.name || classItem.instructor || "Unknown";
              return (
                <ClassCard
                  key={index}
                  title={title}
                  code={code}
                  teacherName={teacherName}
                  colors={colors}
                />
              );
            })}
          </div>
        )}

        {showJoinModal && role === "student" && (
          <JoinClassModal
            colors={colors}
            onClose={() => setShowJoinModal(false)}
            onSubmit={(code) => dispatch(joinClass(code))}
          />
        )}
      </div>
    </>
  );
};

export default Classes;
