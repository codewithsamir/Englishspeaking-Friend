import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { db } from '@/firebase/admin';


export async function GET() {
  return new Response(
    JSON.stringify({
      success: true,
      data: 'Welcome to English Speaking AI!',
    }),
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    // Receive user preferences for conversation
    const { level, topic, userid, conversationType } = await request.json();
    // e.g., level: "beginner", topic: "daily life", conversationType: "casual" or "formal"

    // Generate conversational prompts/questions
    const prompt = `
Generate a list of 5 simple English conversation questions for practicing speaking.
User English level: ${level}
Conversation topic: ${topic}
Style: ${conversationType}
Return ONLY a JSON array of questions like ["Question 1", "Question 2", ...] without any extra text.
These questions will be read aloud by a voice assistant, so do NOT include special characters.
Thank you!
    `;

    const { text: responseText } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt,
    });

    // Parse the questions from AI response
    const questions = JSON.parse(responseText);

    // Create a conversation session or prompt entry in Firestore
    const conversation = {
      userid,
      level,
      topic,
      conversationType,
      questions,
      createdAt: new Date().toISOString(),
    };

    await db.collection('conversations').add(conversation);

    return new Response(JSON.stringify({ success: true, questions }), { status: 200 });
  } catch (error:any) {
    console.error('Error generating conversation questions:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
