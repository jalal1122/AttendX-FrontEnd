import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinClassReset } from "../../features/class/classSlice.js";

const JoinClassModal = ({ colors, onClose, onSubmit }) => {
  const [code, setCode] = useState("");
  const [touched, setTouched] = useState(false);
  const valid = code.trim().length >= 4; // basic check

  const dispatch = useDispatch();

  const { joinClassLoading, joinClassError, joinClassSuccess } = useSelector(
    (state) => state.class
  );

  // Auto-close on success after short delay
  useEffect(() => {
    if (joinClassSuccess) {
      const t = setTimeout(() => {
        onClose();
        dispatch(joinClassReset());
      }, 800);
      return () => clearTimeout(t);
    }
  }, [joinClassSuccess, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Joining class with code:", code);

            setTouched(true);
            if (!valid || joinClassLoading || joinClassSuccess) return;
            onSubmit(code.trim());
          }}
        >
          <div
            className="flex flex-col gap-4 py-6 px-6 rounded-2xl shadow-2xl border backdrop-blur-md"
            style={{
              backgroundColor: colors.Background + "F2",
              borderColor: colors.Secondary,
            }}
          >
            <h2
              className="text-2xl font-extrabold"
              style={{ color: colors.Text.Primary }}
            >
              Join a class
            </h2>
            <label
              className="text-sm font-medium"
              style={{ color: colors.Text.Secondary }}
              htmlFor="joinCode"
            >
              Enter class code
            </label>
            <input
              id="joinCode"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="e.g. ABCD1234"
              className="w-full rounded-lg px-3 py-2 outline-none transition shadow-sm"
              style={{
                backgroundColor: colors.Secondary,
                color: colors.Text.Primary,
                border: `1px solid ${
                  touched && !valid ? colors.Error : colors.Secondary
                }`,
              }}
            />
            {touched && !valid && (
              <p className="text-sm" style={{ color: colors.Error }}>
                Please enter at least 4 characters.
              </p>
            )}
            {joinClassError && (
              <p className="text-sm" style={{ color: colors.Error }}>
                {String(joinClassError)}
              </p>
            )}
            {joinClassSuccess && (
              <p className="text-sm" style={{ color: colors.Success }}>
                Joined successfully!
              </p>
            )}
            <div className="flex gap-3 justify-end mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md font-semibold transition-transform active:scale-95"
                style={{
                  backgroundColor: colors.Secondary,
                  color: colors.Text.Primary,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!valid || joinClassLoading || joinClassSuccess}
                className="px-4 py-2 rounded-md font-semibold hover:scale-105 active:scale-95 transition-transform disabled:opacity-70"
                style={{
                  backgroundColor: colors.Primary,
                  color: "white",
                  cursor:
                    !valid || joinClassLoading || joinClassSuccess
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {joinClassLoading
                  ? "Joining…"
                  : joinClassSuccess
                  ? "Joined"
                  : "Join"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinClassModal;
