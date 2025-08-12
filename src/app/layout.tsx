import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "English Speaking Friend – Practice English with AI",
  description:
    "English Speaking Friend is a fullstack AI-powered platform built with Next.js, Firebase, VAPI, and ShadCN UI to help users improve their English speaking skills in real-time.",
  keywords: [
    "English speaking practice",
    "AI English tutor",
    "Next.js English app",
    "Firebase authentication",
    "language learning",
    "VAPI AI",
    "ShadCN UI",
    "Tailwind CSS",
  ],
  authors: [{ name: "codewithsamir" }],
  openGraph: {
    title: "English Speaking Friend – Practice English with AI",
    description:
      "Practice and improve your English speaking skills with real-time AI conversations powered by Next.js, Firebase, and Google AI.",
    url: "https://yourdomain.com",
    siteName: "English Speaking Friend",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "English Speaking Friend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "English Speaking Friend – Practice English with AI",
    description:
      "A fullstack AI-powered platform to help users improve their English speaking skills with real-time conversations.",
    images: ["https://yourdomain.com/twitter-image.png"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
