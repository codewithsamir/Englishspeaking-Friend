import { getCurrentsUser } from '@/action/auth.action'
import { getFeebbackByUserId } from '@/action/general.action'
import Dashboard from '@/components/Dashboard'
import React from 'react'

const page = async() => {
  const user = await getCurrentsUser()
  // console.log(user)
  const userId = user?.id ?? ""
  const feedback = await getFeebbackByUserId({userId})
  console.log(feedback)
  const isFeedbackAvailable = feedback && Object.keys(feedback).length > 0;
  console.log(isFeedbackAvailable)

  return (
    <Dashboard user={user} trialmode ={isFeedbackAvailable} />
  )
}

export default page