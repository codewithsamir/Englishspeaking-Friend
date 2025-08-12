import { z } from "zod";

export const feedbackSchema = z.object({
  totalScore: z.number().min(0).max(100).describe("Overall score from 0 to 100"),
  
  categoryScores: z.object({
    pronunciationAndClarity: z
      .number()
      .min(0)
      .max(100)
      .describe("Score for pronunciation and clarity (0-100)"),
    grammarAndVocabulary: z
      .number()
      .min(0)
      .max(100)
      .describe("Score for grammar and vocabulary (0-100)"),
    fluencyAndConfidence: z
      .number()
      .min(0)
      .max(100)
      .describe("Score for fluency and confidence (0-100)"),
  }),
  
  strengths: z.string().describe("Strengths of the candidate"),
  areasForImprovement: z.string().describe("Areas where the candidate can improve"),
  finalAssessment: z.string().describe("Final overall assessment of the candidate"),
});
