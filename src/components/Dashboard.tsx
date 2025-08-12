"use client"
import { useState } from "react";

import { FaRobot, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [name, setName] = useState("");
  const router = useRouter();
  
  

  const startSession = () => {
    if (!name) return alert("Please enter your name");

    router.push(`/dashboard/${name}`)



  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to <span className="text-primary">English Speaking Friend</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-primary">
          <div className="card-body items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl shadow-md">
              <FaRobot />
            </div>
            <h2 className="card-title mt-4">AI Partner</h2>
            <p className="text-gray-500">Your friendly AI speaking partner.</p>
          </div>
        </div>

        {/* User Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-secondary">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-white text-2xl shadow-md">
                <FaUser />
              </div>
              <h2 className="card-title">You</h2>
            </div>

            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full mt-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              className={`btn btn-primary mt-6 w-full `}
              onClick={startSession}
            >
              start
            </button>
          </div>
        </div>
      </div>

    
    </div>
  );
}
