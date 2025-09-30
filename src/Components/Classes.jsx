import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  getClasses,
  getJoinedClasses,
  joinClass,
} from "../features/class/classSlice.js";
import ClassCard from "./class-list/ClassCard.jsx";
import ClassSkeleton from "./class-list/ClassSkeleton.jsx";
import EmptyState from "./class-list/EmptyState.jsx";
import JoinClassModal from "./class-list/JoinClassModal.jsx";
import { FiPlus, FiUserPlus, FiRefreshCw } from "react-icons/fi";

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
      if (!teacherClasses || teacherClasses.length === 0)
        dispatch(getClasses());
    } else if (role === "student") {
      if (!joinedClasses || joinedClasses.length === 0)
        dispatch(getJoinedClasses());
    }
  }, [role, teacherClasses, joinedClasses, dispatch]);

  const handleRefresh = useCallback(() => {
    if (role === "teacher" || role === "admin") dispatch(getClasses());
    else if (role === "student") dispatch(getJoinedClasses());
  }, [dispatch, role]);

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
    <div className="w-full flex flex-col gap-6 p-2 md:p-4">
      {/* Hero / Header */}
      <section
        className="relative rounded-2xl p-6 md:p-8 overflow-hidden shadow"
        style={{
          background: `linear-gradient(135deg, ${colors.Primary} 0%, ${colors.Secondary} 90%)`,
          color: colors.Text?.Primary || "#fff",
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {role === "student" ? "My Joined Classes" : "My Classes"}
            </h1>
            <p className="text-sm opacity-80 font-medium">
              {role === "student"
                ? "All the classes you have joined appear here."
                : "Manage and review the classes you created."}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg backdrop-blur-md shadow hover:scale-105 active:scale-95 transition"
              style={{
                backgroundColor: colors.Background + "33",
                color: colors.Text?.Primary,
              }}
            >
              <FiRefreshCw className="text-base" /> Refresh
            </button>
            {role === "student" && (
              <button
                onClick={() => setShowJoinModal(true)}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg shadow hover:scale-105 active:scale-95 transition"
                style={{
                  backgroundColor: colors.Background,
                  color: colors.Text?.Primary,
                }}
              >
                <FiUserPlus /> Join Class
              </button>
            )}
            {(role === "teacher" || role === "admin") && (
              <a
                href="/" /* Assuming create modal is on landing/dashboard */
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg shadow hover:scale-105 active:scale-95 transition"
                style={{
                  backgroundColor: colors.Background,
                  color: colors.Text?.Primary,
                }}
              >
                <FiPlus /> Create Class
              </a>
            )}
          </div>
        </div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_60%)]" />
      </section>

      {/* Error Banner */}
      {errorMessage && (
        <div
          className="rounded-md px-4 py-3 text-sm font-medium shadow flex justify-between items-center"
          style={{ backgroundColor: colors.Error + "1A", color: colors.Error }}
        >
          <span>{errorMessage}</span>
          <button
            onClick={handleRefresh}
            className="text-xs font-semibold underline hover:opacity-80"
            style={{ color: colors.Error }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="w-full">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
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
            actionLabel={
              role === "student"
                ? "Join a class"
                : role === "teacher" || role === "admin"
                ? "Create a class"
                : undefined
            }
            onAction={
              role === "student"
                ? () => setShowJoinModal(true)
                : role === "teacher" || role === "admin"
                ? () => {
                    window.location.href = "/";
                  }
                : undefined
            }
          />
        )}

        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
      </div>

      {showJoinModal && role === "student" && (
        <JoinClassModal
          colors={colors}
          onClose={() => setShowJoinModal(false)}
          onSubmit={(code) => dispatch(joinClass(code))}
        />
      )}
    </div>
  );
};

export default Classes;
