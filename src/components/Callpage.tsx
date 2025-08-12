"use client";
import { FaRobot, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { vapi } from "@/action/vapi.sdk";

import { cn } from "@/lib/utils";

type CallPageProps = {
  type: "generate";
  userId: string;
  userName: string;
};

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
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
    // const { success, feedbackId: id } = await createFeedback({
    //   userId: userId!,
    //   introductionText: messages,
    // });
    // if (success && id) {
    //   router.push(`/interview/${userId}/feedback`);
    // } else {
    //   console.log("error saving feedback");
    //   router.push("/");
    // }
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

  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center px-6">
      {/* Cards Row */}
      <div className="flex flex-col md:flex-row gap-10 mb-10">
        {/* AI Card */}
        <div
          className={`p-6 rounded-2xl shadow-lg w-64 h-80 flex flex-col items-center justify-center transition-all duration-300 bg-primary/30 ring-4 ring-primary scale-105 animate-pulse`}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary opacity-50 blur-xl animate-ping"></div>
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl shadow-lg bg-primary">
              <FaRobot />
            </div>
          </div>
          <p className="mt-6 text-white text-lg font-semibold">AI</p>
          <p className="mt-2 text-sm text-primary animate-bounce">
            {callStatus === CallStatus.ACTIVE && isSpeaking ? "Speaking..." : ""}
          </p>
        </div>

        {/* User Card */}
        <div
          className={`p-6 rounded-2xl shadow-lg w-64 h-80 flex flex-col items-center justify-center transition-all duration-300 bg-secondary/30 ring-4 ring-secondary scale-105 animate-pulse`}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-secondary opacity-50 blur-xl animate-ping"></div>
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl shadow-lg bg-secondary">
              <FaUser />
            </div>
          </div>
          <p className="mt-6 text-white text-lg font-semibold">You</p>
          <p className="mt-2 text-sm text-secondary animate-bounce">
            {callStatus === CallStatus.ACTIVE && !isSpeaking ? "Speaking..." : ""}
          </p>
        </div>
      </div>

      {/* Call Button */}
      <div className="w-full flex justify-center">
        {isCallInactiveOrFinished ? (
          <button
            className="relative btn-call p-2 bg-green-500 "
            onClick={handleCall}
            disabled={callStatus === CallStatus.CONNECTING}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />
            <span>{isCallInactiveOrFinished ? "Call" : "....."}</span>
          </button>
        ) : (
          <button className="btn-disconnect p-2 bg-red-500" onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </div>
  );
}
