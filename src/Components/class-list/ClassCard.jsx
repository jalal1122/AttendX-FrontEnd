import { Link } from "react-router-dom";

const ClassCard = ({ title, code, teacherName, colors }) => {
  const to = code ? `/class/${code}` : "#";
  const initials = (name) => {
    if (!name) return "?";
    const parts = String(name).trim().split(/\s+/);
    return (
      (parts[0]?.[0] || "").toUpperCase() + (parts[1]?.[0] || "").toUpperCase()
    );
  };

  return (
    <Link to={to} className={code ? "" : "pointer-events-none opacity-80"}>
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
            <h2 className="text-lg font-semibold truncate">{title}</h2>
            <p className="text-sm" style={{ color: colors.Text.Secondary }}>
              {teacherName}
            </p>
          </div>
        </div>
        <div className="px-4 pb-4 flex items-center justify-between">
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: colors.Primary, color: "white" }}
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
};

export default ClassCard;
