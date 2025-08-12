"use client";

import { useRouter } from "next/navigation";
import { FaRobot, FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface DashboardProps {
  user: {
    name: string;
    email: string;
    id: string;
  };
  trialmode:boolean
}

export default function Dashboard({ user,trialmode }: DashboardProps) {
  const router = useRouter();
  const { name, id } = user;

  const startSession = () => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col  items-center bg-gray-900 px-6 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-16 text-center text-white tracking-tight select-none">
        Welcome to{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600">
          English Speaking Friend
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-6xl w-full">
        {/* AI Partner Card */}
        <Card
          className="relative rounded-3xl bg-gray-800 border-2 border-cyan-500
            shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_40px_rgba(0,255,255,0.8)]
            transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.04]"
        >
          <CardContent className="flex flex-col items-center text-center space-y-10 p-14">
            <div
              className="w-28 h-28 rounded-full
                bg-gradient-to-tr from-cyan-500 to-blue-600
                flex items-center justify-center text-white text-6xl
                shadow-lg shadow-cyan-400/70"
            >
              <FaRobot />
            </div>
            <CardTitle className="text-3xl font-semibold text-white">
              AI Partner
            </CardTitle>
            <p className="text-cyan-300 max-w-sm mx-auto leading-relaxed font-medium tracking-wide">
              Your friendly AI speaking partner ready to help you practice and improve your English skills.
            </p>
          </CardContent>
        </Card>

        {/* User Card */}
        <Card
          className="relative rounded-3xl bg-gray-800 border-2 border-pink-500
            shadow-[0_0_20px_rgba(255,0,128,0.5)] hover:shadow-[0_0_40px_rgba(255,0,128,0.8)]
            transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.04]"
        >
          <CardContent className="p-14 space-y-10">
            <div className="flex items-center gap-8">
              <div
                className="w-20 h-20 rounded-full
                  bg-gradient-to-tr from-pink-500 to-red-600
                  flex items-center justify-center text-white text-4xl
                  shadow-lg shadow-pink-400/70"
              >
                <FaUser />
              </div>
              <CardTitle className="text-3xl font-semibold text-white">
                {name}
              </CardTitle>
            </div>
{!trialmode ?
 ( <Button
              onClick={startSession}
              className="w-full rounded-2xl
                bg-gradient-to-r from-pink-600 via-red-600 to-pink-700
                shadow-lg shadow-pink-600/80
                hover:from-pink-700 hover:via-red-700 hover:to-pink-800
                hover:shadow-pink-700/90
                active:scale-95
                transition-all duration-300 font-semibold py-4 text-lg"
              aria-label="Start Session"
            >
              Start Session
            </Button>)
 :(
  <h2 className="text-center text-red-600 bg-red-100 border border-red-300 rounded-md p-4 max-w-md mx-auto shadow-sm font-semibold">
  You have already used it.
</h2>

 )}
           
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
