import { getCurrentsUser } from '@/action/auth.action';
import { getFeebbackByUserId } from '@/action/general.action';
import Dashboard from '@/components/Dashboard';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
  

  const [user, feedback] = await Promise.all([
  getCurrentsUser(),
  (async () => {
    const user:any = await getCurrentsUser();
    return getFeebbackByUserId({ userId: user.id });
  })(),
]);

  const {id:userId}:any= user ;
 

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
