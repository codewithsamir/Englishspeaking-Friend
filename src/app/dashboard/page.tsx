import { getCurrentsUser } from '@/action/auth.action';
import { getFeebbackByUserId } from '@/action/general.action';
import Dashboard from '@/components/Dashboard';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
  // Fetch current user
  const user = await getCurrentsUser();

  // console.log(user)
  const isUserAvailable = !!(user && Object.keys(user).length > 0);

  if(!isUserAvailable)   redirect("/")
  
  // Extract userId safely
  const {id:userId}:any= user ;

  // Fetch feedback for this user
  const feedback = await getFeebbackByUserId({ userId });

  // Check if feedback exists and is non-empty
  const isFeedbackAvailable = !!(feedback && Object.keys(feedback).length > 0);

  return (
    <Dashboard
      user={user as User}
      trialmode={isFeedbackAvailable}
      feedback={feedback as Feedback}
    />
  );
};

export default Page;
