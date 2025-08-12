export const feedbackSchema = {
  totalScore: {
    type: "number",
    description: "Overall score from 0 to 100",
  },
  categoryScores: {
    type: "object",
    properties: {
      pronunciationAndClarity: {
        type: "number",
        description: "Score for pronunciation and clarity (0-100)",
      },
      grammarAndVocabulary: {
        type: "number",
        description: "Score for grammar and vocabulary (0-100)",
      },
      fluencyAndConfidence: {
        type: "number",
        description: "Score for fluency and confidence (0-100)",
      },
    },
    required: ["pronunciationAndClarity", "grammarAndVocabulary", "fluencyAndConfidence"],
  },
  strengths: {
    type: "string",
    description: "Strengths of the candidate",
  },
  areasForImprovement: {
    type: "string",
    description: "Areas where the candidate can improve",
  },
  finalAssessment: {
    type: "string",
    description: "Final overall assessment of the candidate",
  },
};
