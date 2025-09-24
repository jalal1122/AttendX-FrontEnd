import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getClasses } from "../features/class/classSlice.js";
import { useEffect, useMemo, useState } from "react";

const Classes = ({setActiveTab}) => {
  // get the colors from the redux store
  const { colors } = useSelector((state) => state.color);

  const [errorMessage, setErrorMessage] = useState("");

  const {
    isError,
    Loading,
    message,
    classes: classList,
  } = useSelector((state) => state.class);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      setErrorMessage(message || "An error occurred while fetching classes.");
    } else {
      setErrorMessage("");
    }
  }, [isError, message]);

  // Fetch classes on first mount
  useEffect(() => {
    dispatch(getClasses());
    // We intentionally dispatch once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = Boolean(Loading);
  const items = useMemo(() => classList || [], [classList]);
  const initials = (name) => {
    if (!name) return "?";
    const parts = String(name).trim().split(/\s+/);
    return (
      (parts[0]?.[0] || "").toUpperCase() + (parts[1]?.[0] || "").toUpperCase()
    );
  };

  return (
    <div className="w-full p-2">
      {errorMessage && (
        <div
          className="mb-3 rounded-md px-3 py-2 text-sm font-medium"
          style={{ backgroundColor: colors.Error + "1A", color: colors.Error }}
        >
          {errorMessage}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border shadow-sm animate-pulse"
              style={{
                backgroundColor: colors.Background,
                borderColor: colors.Secondary,
              }}
            >
              <div className="p-4 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full"
                  style={{ backgroundColor: colors.Secondary }}
                />
                <div className="flex-1">
                  <div
                    className="h-4 w-3/5 rounded"
                    style={{ backgroundColor: colors.Secondary }}
                  />
                  <div
                    className="h-3 w-2/5 mt-2 rounded"
                    style={{ backgroundColor: colors.Secondary }}
                  />
                </div>
              </div>
              <div className="px-4 pb-4">
                <div
                  className="h-8 w-20 rounded"
                  style={{ backgroundColor: colors.Secondary }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-2xl border text-center"
          style={{
            backgroundColor: colors.Background,
            borderColor: colors.Secondary,
            color: colors.Text.Secondary,
          }}
        >
          <div className="text-4xl mb-3" aria-hidden>
            📚
          </div>
          <h3
            className="text-xl font-bold mb-1"
            style={{ color: colors.Text.Primary }}
          >
            No classes yet
          </h3>
          <p className="max-w-md">
            You don't have any classes assigned. Once you create or join a
            class, it will appear here.
          </p>
        </div>
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
            const to = code ? `/class/${code}` : "#";
            return (
              <Link
                to={to}
                key={index}
                className={code ? "" : "pointer-events-none opacity-80"}
              >
                <div
                  className="group rounded-2xl border shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden"
                  style={{
                    backgroundColor: colors.Background,
                    borderColor: colors.Secondary,
                    color: colors.Text.Primary,
                  }}
                >
                  <div className="p-4 flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center font-bold shadow-sm"
                      style={{
                        backgroundColor: colors.Secondary,
                        color: colors.Text.Primary,
                      }}
                      aria-hidden
                    >
                      {initials(teacherName)}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold truncate">
                        {title}
                      </h2>
                      <p
                        className="text-sm"
                        style={{ color: colors.Text.Secondary }}
                      >
                        {teacherName}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex items-center justify-between">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full shadow-sm"
                      style={{
                        backgroundColor: colors.Primary,
                        color: "white",
                      }}
                    >
                      {code || "No code"}
                    </span>
                    <span
                      className="text-xs opacity-70 group-hover:opacity-100 transition-opacity"
                      style={{ color: colors.Text.Secondary }}
                    >
                      View details →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Classes;
