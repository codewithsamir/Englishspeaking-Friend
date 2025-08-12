import { getCurrentsUser } from '@/action/auth.action';
import { getFeebbackByUserId } from '@/action/general.action';
import Link from 'next/link';
import React from 'react';

interface RouteParams {
  params: { userid: string };
}

export default async function Page({ params }: RouteParams) {
  const { userid: userId } = await params;
  const user = await getCurrentsUser();
  const feedback = await getFeebbackByUserId({ userId });

  if (!feedback) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <p className="text-gray-500 mb-4">No feedback found.</p>
        <Link href="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Feedback for {user?.name || 'Student'}
        </h1>
        <Link href="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
      </div>

      {/* General Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ScoreCard
          title="Pronunciation & Clarity"
          score={feedback.categoryScores.pronunciationAndClarity}
        />
        <ScoreCard
          title="Grammar & Vocabulary"
          score={feedback.categoryScores.grammarAndVocabulary}
        />
        <ScoreCard
          title="Fluency & Confidence"
          score={feedback.categoryScores.fluencyAndConfidence}
        />
      </div>

      {/* Total Score */}
      <div className="mb-6 p-4 rounded-lg bg-base-200">
        <p className="text-lg font-semibold">
          Total Score: {feedback.totalScore}
        </p>
      </div>

      {/* Strengths */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Strengths</h2>
        <p className="text-gray-700">{feedback.strengths}</p>
      </section>

      {/* Areas for Improvement */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Areas for Improvement</h2>
        <p className="text-gray-700">{feedback.areasForImprovement}</p>
      </section>

      {/* Final Assessment */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Final Assessment</h2>
        <p className="text-gray-700">{feedback.finalAssessment}</p>
      </section>

      {/* Created Date */}
      <div className="text-sm text-gray-500">
        Created at: {new Date(feedback.createdAt).toLocaleString()}
      </div>
    </div>
  );
}

function ScoreCard({ title, score }: { title: string; score: number }) {
  return (
    <div className="p-4 rounded-lg shadow bg-base-100 text-center">
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold">{score}</p>
    </div>
  );
}
