"use server";

import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { feedbackSchema } from "@/constant";

// Create feedback for user’s introduction speech
export async function createFeedback(params: {
  userId: string;
  interviewId: string; // one conversation/interview id
  introductionText: string; // The single user introduction as plain text
}) {
  const { userId, interviewId, introductionText } = params;

  try {
    // Prepare prompt for Gemini AI
    const prompt = `
You are an English tutor evaluating a student's self-introduction to improve their speaking skills.  
Evaluate the introduction carefully and provide detailed feedback.  
If there are mistakes, kindly point them out and suggest improvements.  
Score from 0 to 100 in these areas only:  
- Pronunciation & Clarity  
- Grammar & Vocabulary  
- Fluency & Confidence  

Introduction text:  
${introductionText}
`;

    const {
      object: { totalScore, categoryScores, strengths, areasForImprovement, finalAssessment },
    } = await generateObject({
        model:google('gemini-2.0-flash-001',{
            structuredOutputs:false,
        }),
      schema: feedbackSchema,
      prompt,
      system: "You are a helpful English tutor giving constructive feedback on a student's introduction.",
    });

    // Save feedback to Firebase linked with user & interview
    const feedbackDoc = await db.collection("feedback").add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      feedbackId: feedbackDoc.id,
    };
  } catch (error) {
    console.error("Error creating feedback:", error);
    return { success: false };
  }
}

// Get feedback for specific user & interview
export async function getFeedbackByInterviewId(params: {
  interviewId: string;
  userId: string;
}): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const feedbackSnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (feedbackSnapshot.empty) return null;

  const feedbackDoc = feedbackSnapshot.docs[0];

  return {
    id: feedbackDoc.id,
    ...feedbackDoc.data(),
  } as Feedback;
}
