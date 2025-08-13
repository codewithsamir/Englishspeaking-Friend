interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}
// User info
interface User {
  id: string;
  name: string;
  email: string;
}


interface GoogleSignUpParams {
  uid:string;
  idToken: string;
  name: string;
  email: string;
  
}

// Conversation session (similar to Interview)
interface ConversationSession {
  id: string;
  userId: string;
  startedAt: string;           // ISO date string
  endedAt?: string;            // optional, set when finished
  durationSeconds?: number;    // optional duration of the session
  type: "practice" | "test";   // could be practice or timed test session
  topics?: string[];           // conversation topics if any
  finalized: boolean;
}

// Feedback specific to English speaking practice
interface SpeakingFeedback {
  id: string;
  sessionId: string;             // conversation session ID
  userId: string;
  totalScore: number;            // e.g., 0-100 based on AI evaluation
  categoryScores: Array<{
    category: "fluency" | "pronunciation" | "grammar" | "confidence" | string;
    score: number;               // score for this category
    comment: string;             // AI or human feedback text
  }>;
  strengths: string[];           // What user did well
  areasForImprovement: string[]; // What to work on
  overallAssessment: string;     // Summary or final comments
  createdAt: string;             // feedback creation date/time
}

// Params to create feedback from transcript
interface CreateFeedbackParams {
  sessionId: string;
  userId: string;
  transcript: Array<{ speaker: "user" | "ai"; content: string }>;
  feedbackId?: string;           // optional, for updating feedback
}

// Props for a conversation card in UI
interface ConversationCardProps {
  id: string;
  userId: string;
  startedAt: string;
  type: "practice" | "test";
  topics?: string[];
  finalized: boolean;
}

// Props for AI conversation agent
interface AgentProps {
  userName: string;
  userId: string;
  sessionId?: string;
  feedbackId?: string;
  mode: "practice" | "interview";  // practice or interview mode (you may call 'interview' for formal tests)
  topics?: string[];
}

// Parameters for fetching feedback by session
interface GetFeedbackBySessionParams {
  sessionId: string;
  userId: string;
}

// Parameters for fetching recent conversation sessions
interface GetLatestSessionsParams {
  userId: string;
  limit?: number;
}

// Authentication
interface SignInParams {
  email: string;
  idToken: string; // from Google or Firebase
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password?: string;  // optional if using social login
}

// Form mode type
type FormType = "sign-in" | "sign-up";

// Props for session form (starting a new conversation/practice)
interface ConversationFormProps {
  sessionId?: string;
  type: "practice" | "test";
  topics?: string[];
  durationMinutes?: number;
}

// Tech icons (optional for topics or AI skills displayed)
interface TechIconProps {
  topics: string[];
}

interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}
interface GetFeedbackByInterviewIdParams {
  
  userId: string | undefined;
}


interface Feedback {
  id: string;
  userId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}


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