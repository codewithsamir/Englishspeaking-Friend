"use client";

import { signUpWithGoogle } from "@/action/auth.action";
import { auth, googleprovider } from "@/firebase/client";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleprovider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await signUpWithGoogle({
        idToken,
        uid: user.uid,
        name: user.displayName ?? "",
        email: user.email ?? "",
      });

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success("Signed in with Google!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Google sign-in failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 px-6">
      <Card className="w-full max-w-md bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-cyan-700 rounded-3xl">
        <CardContent className="flex flex-col items-center text-center gap-6 py-12 px-10">
          {/* Logo / Icon */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-white text-5xl font-extrabold shadow-xl">
            ES
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 select-none">
            English Speaking Friend
          </h1>

          {/* Subtitle */}
          <p className="text-md text-gray-300 max-w-xs">
            Practice English with AI in real-time
          </p>

          {/* Google Login Button with 3D style */}
          <Button
            onClick={handleGoogleSignIn}
            className={`
              mt-10 w-full flex items-center justify-center gap-4 rounded-xl 
              bg-cyan-700 text-cyan-100
              shadow-[0_6px_0_0_rgba(22,163,74,0.8)] 
              hover:shadow-[0_10px_20px_rgba(22,163,74,0.7)]
              active:translate-y-[2px] active:shadow-[0_3px_0_0_rgba(22,163,74,0.8)]
              transition-all duration-300
              select-none
            `}
          >
            <FcGoogle size={26} />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
