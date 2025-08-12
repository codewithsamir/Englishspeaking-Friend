"use client";

import { signUpWithGoogle } from "@/action/auth.action";
import { auth, googleprovider } from "@/firebase/client";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import  {toast} from 'sonner'

export default function AuthPage() {
  const router = useRouter()
 const handleGoogleSignIn = async () => {
    
    try {
      const result = await signInWithPopup(auth, googleprovider)
      const user = result.user
      const idToken = await user.getIdToken()


   const response = await signUpWithGoogle({
    idToken,
      uid: user.uid,
      name: user.displayName ?? "",
      email: user.email ?? ""
    });

    if (!response.success) {
      toast.error(response.message);
      return;
    }

      toast.success('Signed in with Google!')
      router.push('/dashboard')
    } catch (error: any) {
      // console.error('Google Sign-In Error:', error)
      toast.error(error.message || 'Google sign-in failed')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="card w-96 bg-base-100/80 backdrop-blur-md shadow-2xl border border-white/20">
        <div className="card-body items-center text-center">
          {/* Logo / Icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            ES
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            English Speaking Friend
          </h1>

          {/* Subtitle */}
          <p className="mt-2 text-sm text-gray-600">
            Practice English with AI in real-time
          </p>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleSignIn}
            className="btn mt-6 w-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 flex items-center justify-center gap-3 transition-transform hover:scale-[1.02]"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
