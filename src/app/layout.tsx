import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo/wrapper";
import { MainLayout } from "@/components/main-layout";
import { AuthProvider } from "@/contexts/auth-context";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Z-Chatbot AI",
    template: "%s | Z-Chatbot AI",
  },
  description: "Your intelligent AI assistant for seamless conversations and enhanced productivity.",
  keywords: ["AI", "chatbot", "artificial intelligence", "conversation", "assistant"],
  authors: [{ name: "Z-Chatbot AI Team" }],
  creator: "Z-Chatbot AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://z-chatbot-ai.com",
    title: "Z-Chatbot AI",
    description: "Your intelligent AI assistant for seamless conversations and enhanced productivity.",
    siteName: "Z-Chatbot AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Z-Chatbot AI",
    description: "Your intelligent AI assistant for seamless conversations and enhanced productivity.",
    creator: "@zchatbotai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ApolloWrapper>
            <MainLayout>{children}</MainLayout>
          </ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
