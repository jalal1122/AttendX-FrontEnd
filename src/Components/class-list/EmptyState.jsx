const EmptyState = ({ colors, title, subtitle, actionLabel, onAction }) => (
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
      {title}
    </h3>
    <p className="max-w-md">{subtitle}</p>
    {actionLabel && onAction && (
      <button
        className="mt-4 px-4 py-2 rounded-md font-semibold hover:scale-105 active:scale-95 transition-transform"
        style={{ backgroundColor: colors.Primary, color: "white" }}
        onClick={onAction}
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
