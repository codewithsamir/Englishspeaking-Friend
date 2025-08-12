import { CheckCircle, Volume2, Smile } from "lucide-react";

type FeedbackProps = {
  name: string;
};

export default function Feedback({ name }: FeedbackProps) {
  const feedbackList = [
    { icon: <CheckCircle className="text-green-500 w-5 h-5" />, text: "Good sentence structure" },
    { icon: <Volume2 className="text-blue-500 w-5 h-5" />, text: "Clear pronunciation" },
    { icon: <Smile className="text-yellow-500 w-5 h-5" />, text: "Try to speak more confidently" },
  ];

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-green-50 via-white to-green-50 rounded-2xl shadow-lg border border-green-200 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-3 text-green-700 flex items-center gap-2">
        🌟 Great job, {name}!
      </h2>
      <p className="text-gray-700 mb-4">
        You just completed a <span className="font-semibold">5-minute English conversation</span>.
        Here’s your feedback:
      </p>
      <ul className="space-y-3">
        {feedbackList.map((item, index) => (
          <li key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            {item.icon}
            <span className="text-gray-800">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
