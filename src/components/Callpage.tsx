"use client"
import { FaRobot, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

type CallPageProps = {
  speaker: "ai" | "user";
};

export default function CallPage({ speaker }: CallPageProps) {
  const router = useRouter();

  const handleEndCall = () => {
    // Add your call-ending logic here
    router.push("/dashboard"); // Redirect after ending
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center px-6">
      {/* Cards Row */}
      <div className="flex flex-col md:flex-row gap-10 mb-10">
        {/* AI Card */}
        <div
          className={`p-6 rounded-2xl shadow-lg w-64 h-80 flex flex-col items-center justify-center transition-all duration-300
          ${
            speaker === "ai"
              ? "bg-primary/30 ring-4 ring-primary scale-105 animate-pulse"
              : "bg-gray-800"
          }`}
        >
          <div className="relative">
            {speaker === "ai" && (
              <div className="absolute inset-0 rounded-full bg-primary opacity-50 blur-xl animate-ping"></div>
            )}
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl shadow-lg
              ${speaker === "ai" ? "bg-primary" : "bg-gray-600"}`}
            >
              <FaRobot />
            </div>
          </div>
          <p className="mt-6 text-white text-lg font-semibold">AI</p>
          {speaker === "ai" && (
            <p className="mt-2 text-sm text-primary animate-bounce">Speaking...</p>
          )}
        </div>

        {/* User Card */}
        <div
          className={`p-6 rounded-2xl shadow-lg w-64 h-80 flex flex-col items-center justify-center transition-all duration-300
          ${
            speaker === "user"
              ? "bg-secondary/30 ring-4 ring-secondary scale-105 animate-pulse"
              : "bg-gray-800"
          }`}
        >
          <div className="relative">
            {speaker === "user" && (
              <div className="absolute inset-0 rounded-full bg-secondary opacity-50 blur-xl animate-ping"></div>
            )}
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl shadow-lg
              ${speaker === "user" ? "bg-secondary" : "bg-gray-600"}`}
            >
              <FaUser />
            </div>
          </div>
          <p className="mt-6 text-white text-lg font-semibold">You</p>
          {speaker === "user" && (
            <p className="mt-2 text-sm text-secondary animate-bounce">Speaking...</p>
          )}
        </div>
      </div>

      {/* End Call Button */}
      <button
        onClick={handleEndCall}
        className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold text-lg shadow-md"
      >
        End Call
      </button>
    </div>
  );
}
