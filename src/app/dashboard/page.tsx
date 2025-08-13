import { getCurrentsUser } from '@/action/auth.action';
import { getFeebbackByUserId } from '@/action/general.action';
import Dashboard from '@/components/Dashboard';

import React from 'react';

const Page = async () => {
  

const user = await getCurrentsUser();
const { id: userId }: any = user;
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
