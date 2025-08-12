"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface FeedbackSummary {
  id: string;
  userId:string;
  totalScore: number;
  categoryScores: {
    pronunciationAndClarity: number;
    grammarAndVocabulary: number;
    fluencyAndConfidence: number;
  };
  strengths: string;
  createdAt: string;
}

interface FeedbackCardProps {
  feedback: FeedbackSummary;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  const router = useRouter();
  const { id, totalScore, categoryScores, strengths, createdAt,userId } = feedback;

  // Short snippet for strengths (max 100 chars)
  const strengthsSnippet =
    strengths.length > 100 ? strengths.slice(0, 100) + "..." : strengths;

  // Format date nicely
  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleClick = () => {
    router.push(`/dashboard/${userId}/feedback`);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-lg font-semibold">Total Score: {totalScore}</CardTitle>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="font-medium">Pronunciation</p>
            <p className="text-primary font-bold">{categoryScores.pronunciationAndClarity}</p>
          </div>
          <div>
            <p className="font-medium">Grammar</p>
            <p className="text-primary font-bold">{categoryScores.grammarAndVocabulary}</p>
          </div>
          <div>
            <p className="font-medium">Fluency</p>
            <p className="text-primary font-bold">{categoryScores.fluencyAndConfidence}</p>
          </div>
        </div>

        <p className="text-gray-700">{strengthsSnippet}</p>
      </CardContent>
    </Card>
  );
}
