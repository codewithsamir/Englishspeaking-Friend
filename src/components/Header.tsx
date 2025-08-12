"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signOut } from "@/action/auth.action";
import Link from "next/link";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Successfully logged out");
      router.push("/");
    } catch (error) {
      toast.error("Signout failed");
    }
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 select-none cursor-default">
        English Speaking Friend
      </h1>
<div className="btn-box space-x-8">
     <Link href={"/dashboard"}>
      <Button
        variant="ghost"
      
        className="relative overflow-hidden group border border-pink-500 text-pink-400 hover:text-white hover:bg-pink-500 rounded-lg px-5 py-2 transition-all duration-300 shadow-pink-600/50 hover:shadow-lg"
      >
        Dashboard
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-pink-600 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity duration-300"
        />
      </Button>
      </Link>
    
      <Link href={"/dashboard/plan"}>
      <Button
        variant="ghost"
      
        className="relative overflow-hidden group border border-pink-500 text-pink-400 hover:text-white hover:bg-pink-500 rounded-lg px-5 py-2 transition-all duration-300 shadow-pink-600/50 hover:shadow-lg"
      >
        Plan
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-pink-600 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity duration-300"
        />
      </Button>
      </Link>

      <Button
        variant="ghost"
        onClick={handleLogout}
        className="relative overflow-hidden group border border-pink-500 text-pink-400 hover:text-white hover:bg-pink-500 rounded-lg px-5 py-2 transition-all duration-300 shadow-pink-600/50 hover:shadow-lg"
      >
        Logout
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-pink-600 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity duration-300"
        />
      </Button>
</div>
    </header>
  );
}
