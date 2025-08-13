"use client";
import { FaRobot, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { vapi } from "@/action/vapi.sdk";

import { cn } from "@/lib/utils";
import { createFeedback } from "@/action/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export default function CallPage({ type, userId, userName }: CallPageProps) {
  const router = useRouter();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript,
        };
        console.log(newMessage);
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log("error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    console.log("generate feedback here.");

    // TODO: Uncomment and implement server action to generate feedback
    const { success, feedbackId: id } = await createFeedback({
      userId: userId!,
      introductionText: messages,
    });
    if (success && id) {
      router.push(`/dashboard/${userId}/feedback`);
    } else {
      console.log("error saving feedback");
      router.push("/dashboard");
    }
  };
 

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        handleGenerateFeedback(messages);
      } else {
        router.push("/");
      }
    }
  }, [messages, callStatus, type, router]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
console.log("hello")
    if (type === "generate") {
     const data = await vapi.start(
        undefined,
        undefined,
        undefined,
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
        {
          variableValues: {
            username: userName,
            userid: userId,
          },
        }
      );
      console.log(data)
    } else {
      // Other call types logic here if needed
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };


   const lastestmessage = messages[messages.length - 1] ?.content;

  

  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center px-6">
      {/* Cards Row */}
      <div className="flex flex-col md:flex-row gap-10 mb-10">
  {/* AI Card */}
  <div
    className={cn(
      "p-6 rounded-2xl shadow-lg w-64 h-64 flex flex-col items-center justify-center transition-all duration-300 scale-105",
      callStatus === CallStatus.ACTIVE && isSpeaking
        ? "bg-purple-600 ring-8 ring-purple-400 animate-pulse" // AI speaking highlight
        : "bg-primary/30 ring-4 ring-primary" // default
    )}
  >
    <div className="relative">
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-50 blur-xl",
          callStatus === CallStatus.ACTIVE && isSpeaking
            ? "bg-purple-400 animate-ping"
            : "bg-primary"
        )}
      ></div>
      <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl shadow-lg bg-purple-600">
        <FaRobot />
      </div>
    </div>
    <p className="mt-6 text-white text-lg font-semibold">AI</p>
    <p className="mt-2 text-sm text-white animate-bounce">
      {callStatus === CallStatus.ACTIVE && isSpeaking ? "Speaking..." : ""}
    </p>
  </div>

  {/* User Card */}
  <div
    className={cn(
      "p-6 rounded-2xl shadow-lg w-64 h-64 flex flex-col items-center justify-center transition-all duration-300 scale-105",
      callStatus === CallStatus.ACTIVE && !isSpeaking
        ? "bg-blue-600 ring-8 ring-blue-400 animate-pulse" // User speaking highlight
        : "bg-secondary/30 ring-4 ring-secondary" // default
    )}
  >
    <div className="relative">
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-50 blur-xl",
          callStatus === CallStatus.ACTIVE && !isSpeaking
            ? "bg-blue-400 animate-ping"
            : "bg-secondary"
        )}
      ></div>
      <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl shadow-lg bg-blue-600">
        <FaUser />
      </div>
    </div>
    <p className="mt-6 text-white text-lg font-semibold">{userName}</p>
    <p className="mt-2 text-sm text-white animate-bounce">
      {callStatus === CallStatus.ACTIVE && !isSpeaking ? "Speaking..." : ""}
    </p>
  </div>
</div>

   {/* Transcript */}
{messages.length > 0 && (
  <div className="w-full max-w-md p-4 bg-gray-800 rounded-xl border border-gray-700 mt-6 overflow-y-auto h-40">
  
      <p
        key={lastestmessage}
        className={cn(
          "text-white p-2 rounded-lg mb-2 transition-all duration-500",
          "bg-blue-600 self-end text-right"
        )}
      >
        {lastestmessage}
      </p>
   
  </div>
)}



      {/* Call Button */}
      <div className="w-full flex justify-center mt-6">
  {isCallInactiveOrFinished ? (
    <button
      className={cn(
        "relative px-6 py-3 rounded-full text-white font-bold uppercase tracking-wide shadow-lg transform transition-all duration-300",
        callStatus === CallStatus.CONNECTING
          ? "bg-green-500 animate-pulse cursor-not-allowed"
          : "bg-gradient-to-r from-green-400 to-green-600 hover:scale-105 hover:shadow-2xl"
      )}
      onClick={handleCall}
      disabled={callStatus === CallStatus.CONNECTING}
    >
      {callStatus === CallStatus.CONNECTING ? "Connecting..." : "Start Call"}
    </button>
  ) : (
    <button
      className="px-6 py-3 rounded-full text-white font-bold uppercase tracking-wide bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 hover:shadow-2xl transition-all duration-300"
      onClick={handleDisconnect}
    >
      End Call
    </button>
  )}
</div>

    </div>
  );
}
