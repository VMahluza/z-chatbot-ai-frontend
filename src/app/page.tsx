import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, MessageSquare, Zap, Shield, BarChart3, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
 
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Z-Chatbot AI
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Your intelligent AI assistant for seamless conversations and enhanced productivity. 
                Experience the future of communication with our advanced chatbot technology.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Chatting
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/docs">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Powerful Features
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover what makes Z-Chatbot AI the perfect solution for all your conversational needs.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Bot className="h-10 w-10 text-blue-600" />
                <CardTitle>Intelligent Conversations</CardTitle>
                <CardDescription>
                  Advanced AI technology that understands context and provides meaningful responses.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-yellow-600" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Get instant responses with our optimized AI infrastructure and real-time processing.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-green-600" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your conversations are protected with enterprise-grade security and privacy measures.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-purple-600" />
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Track conversation patterns and gain valuable insights from your interactions.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Sparkles className="h-10 w-10 text-pink-600" />
                <CardTitle>Customizable</CardTitle>
                <CardDescription>
                  Tailor the AI personality and responses to match your specific needs and preferences.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-indigo-600" />
                <CardTitle>Multi-Platform</CardTitle>
                <CardDescription>
                  Access your AI assistant from any device with our responsive web interface.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join thousands of users who are already experiencing the power of AI-driven conversations.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/chat">
                  <Bot className="mr-2 h-4 w-4" />
                  Try It Now
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </>
    
  );
}
