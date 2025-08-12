"use client"
import { FaRobot, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { vapi } from "@/action/vapi.sdk";
import { createFeedback } from "@/action/general.action";
import { cn } from "@/lib/utils";

type CallPageProps = {
  speaker: "ai" | "user" ;
  type:"generate"
  userId:string
  userName:string
};


enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

interface SavedMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;

}

export default function CallPage({ speaker,type,userId,userName }: CallPageProps) {
  const router = useRouter();

   const [isSpeaking, setIsSpeaking] = useState(false)
  const [callStatus, setcallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
const [messages, setmessages] = useState<SavedMessage[]>([]);


useEffect(()=>{
  const onCallStart = ()=> setcallStatus(CallStatus.ACTIVE);
  const onCallEnd = ()=>setcallStatus(CallStatus.FINISHED);

  const  onMessage = (message: Message)=>{
    if(message.type === 'transcript' && message.transcriptType === 'final'){
const newMessage = {
  role: message.role , content : message.transcript
}
console.log(newMessage)
setmessages((prev)=>[...prev,newMessage])
    }
  }

  const onSpeechStart = ()=>setIsSpeaking(true);
  const onSpeechEnd = ()=>setIsSpeaking(false);

  const onError = (error : Error)=>console.log("error", error)

  vapi.on('call-start', onCallStart)
  vapi.on('call-end', onCallEnd)
  vapi.on('message', onMessage)
  vapi.on('call-start', onCallStart)
  vapi.on('speech-start', onSpeechStart)
  vapi.on('speech-end', onSpeechEnd)
  vapi.on('error',onError)

  return ()=>{
    vapi.off('call-start', onCallStart)
    vapi.off('call-end', onCallEnd)
    vapi.off('message', onMessage)
    vapi.off('call-start', onCallStart)
    vapi.off('speech-start', onSpeechStart)
    vapi.off('speech-end', onSpeechEnd)
    vapi.off('error',onError)
  }
},[])

const handleGenerateFeedback = async(messages:SavedMessage[])=>{
  console.log('generate feedback here.');


  //Todo: create a server action that generates feedback
  // const {success, feedbackId: id} = await createFeedback({
  //   userId:userId!,
  //   introductionText:messages
  // })
  // if(success && id){
  //   router.push(`/interview/${userId}/feedback`)
  // }else{
  //   console.log('error saving feedback')
  //   router.push('/')
  // }
}

useEffect(()=>{
  if(callStatus === CallStatus.FINISHED){
    if(type === 'generate'){
      router.push("/")
    }else{
      handleGenerateFeedback(messages);
    }
  }
if(callStatus === CallStatus.FINISHED) router.push('/');

},
[messages,callStatus,type,userId])


const handleCall = async ()=>{
  setcallStatus(CallStatus.CONNECTING);

  if(type === 'generate'){

 await vapi.start(
  undefined,
  undefined,
  undefined,
  process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
    
   
    variableValues:{
      username:userName,
      userid:userId,
      
    }
  })

  }else{
    let formatedquestions = '';

   

 
}

const handleDisconnect = async ()=>{
  setcallStatus(CallStatus.FINISHED);

  vapi.stop();
}


    const lastestmessage = messages[messages.length - 1] ?.content;

    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

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
    <div className="w-full flex justify-center">
    {callStatus !== 'ACTIVE' ?
     (
        <button className='relative btn-call' 
        onClick={handleCall}
        >
            <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')}/>
               
               <span>
               {isCallInactiveOrFinished ? 'call' : "....."}
               </span>
            
        </button>
     )
      :
      (
        <button className='btn-disconnect' 
        onClick={handleDisconnect}
        >End</button>
      )
      }
  </div>
    </div>
  );
}
