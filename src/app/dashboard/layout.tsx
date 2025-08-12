

import { isAuthenticated } from '@/action/auth.action';
import Header from '@/components/Header';
import { redirect } from 'next/navigation';

import React, { ReactNode } from 'react';


const Rootlayout =async ({children}:{children:ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();


  if(!isUserAuthenticated)  redirect("/")
  return (
    <div className="root-layout">
      <Header/>
      {children}
    </div>
  )
}

export default Rootlayout