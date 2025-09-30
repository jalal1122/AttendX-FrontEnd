import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { FiClock, FiActivity } from "react-icons/fi";
import Navbar from "../Components/Navbar/Navbar";

export const Session = () => {
  const { colors } = useSelector((state) => state.color);

  return (
    <>
    <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-between p-6"
        style={{ backgroundColor: colors.Secondary }}
      >
        {/* Session Info */}
        <div
          className="w-full max-w-4xl text-center mb-8 relative rounded-3xl p-8 shadow-xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.Primary} 0%, ${colors.Background} 85%)`,
            color: colors.Text.Primary,
          }}
        >
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Mobile App Development – Lecture 5
            </h1>
            <p className="text-base md:text-lg opacity-80 font-medium mb-2">
               {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm md:text-base opacity-70 mb-4">
              Teacher: Majid Shahab
            </p>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full backdrop-blur-md shadow border"
              style={{
                backgroundColor: colors.Background + "CC",
                borderColor: colors.Secondary,
                color: "#10b981",
              }}
            >
              <FiActivity /> Ongoing Session
            </span>
          </div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_60%)]" />
        </div>

        {/* QR Code */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div
            className="p-8 md:p-12 rounded-3xl shadow-xl border flex flex-col items-center max-w-md w-full"
            style={{
              backgroundColor: colors.Background,
              borderColor: colors.Secondary,
              color: colors.Text.Primary,
            }}
          >
            <h2 className="text-xl font-bold mb-6">Attendance QR Code</h2>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <QRCode value="AttendX-Session-DBMS-5" size={220} />
            </div>
            <p
              className="mt-6 text-center text-sm max-w-xs"
              style={{ color: colors.Text.Primary, opacity: 0.7 }}
            >
              Scan this QR Code with AttendX app to mark attendance
            </p>

            {/* Countdown Timer */}
            <div className="mt-6 text-center">
              <p
                className="text-xs mb-2"
                style={{ color: colors.Text.Primary, opacity: 0.7 }}
              >
                QR Code expires in:
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg bg-red-100 text-red-600">
                <FiClock />
                30s
              </div>
            </div>
          </div>
        </div>

        {/* End Button */}
        <div className="flex gap-4 mt-8">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
            End Session
          </button>
        </div>

        {/* Floating Notification (Demo) */}
        <div
          className="absolute bottom-4 right-6 p-4 rounded-2xl shadow-xl border max-w-sm z-50"
          style={{
            backgroundColor: colors.Background,
            borderColor: colors.Primary,
            color: colors.Text.Primary,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm"
              style={{
                backgroundColor: colors.Primary,
                color: colors.Text.Primary,
              }}
            >
              ✓
            </div>
            <div >
              <p className="font-semibold text-sm">New Attendance!</p>
              <p className="text-sm opacity-70">
                Mahnoor Zafar just marked attendance
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Session;
