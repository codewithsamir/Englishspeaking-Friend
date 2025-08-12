'use server'

import { db , auth } from "@/firebase/admin";


import { cookies } from "next/headers";


const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUpWithGoogle(params: GoogleSignUpParams) {
  const { uid, name, email,idToken } = params;
//   console.log(params)

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if (userRecord.exists) {
        await setSessionCookie(idToken)
      return {
        success: true, // Already signed up via Google, so still a success
        message: 'User already exists. Logged in with Google.',
      };
    }

    
        await setSessionCookie(idToken)

    await db.collection('users').doc(uid).set({
      name,
      email,
      provider: 'google',
    });
   

    return {
      success: true,
      message: 'Successfully signed up with Google.',
    };
  } catch (error: any) {
    // console.error('Google Auth SignUp Error:', error);
    return {
      success: false,
      message: 'Failed to sign up with Google.',
    };
  }
}




export async function setSessionCookie(idToken:string){
    
    const cookieStore = await cookies();
    const sessionCookie  = await auth.createSessionCookie(idToken , {
        expiresIn: ONE_WEEK * 100 ,
    })

    cookieStore.set('session', sessionCookie,{
        maxAge: ONE_WEEK,
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite:'lax'
    })
}


export async function getCurrentsUser() : Promise<User | null >{
const cookieStore = await cookies();

const sessionCookie = cookieStore.get('session')?.value;
// console.log(sessionCookie)
if(!sessionCookie) return null;

try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie,true);

    const userRecord = await db.collection
    ('users')
    .doc(decodedClaims.uid)
    .get();

    if(!userRecord) return null;

    return {
        ...userRecord.data(),
        id : userRecord.id,

    } as User;
} catch (error) {
    // console.error(error);
    return null;
    
}
}


export async function isAuthenticated(){
    const user = await getCurrentsUser();
// console.log(user)
    return !!user;
}





