const ClassSkeleton = ({ colors }) => (
  <div
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
);

export default ClassSkeleton;
