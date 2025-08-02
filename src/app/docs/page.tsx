import { MainLayout } from "@/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Book, Code, MessageSquare, Settings } from "lucide-react";

export default function DocsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to make the most of Z-Chatbot AI with our comprehensive guides and API documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Book className="h-8 w-8 mb-2" />
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Quick start guide to begin using Z-Chatbot AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn the basics of interacting with our AI assistant and discover key features.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-8 w-8 mb-2" />
                <CardTitle>Chat Best Practices</CardTitle>
                <CardDescription>
                  Tips for effective AI conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover how to craft better prompts and get more accurate responses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Code className="h-8 w-8 mb-2" />
                <CardTitle>API Reference</CardTitle>
                <CardDescription>
                  Complete API documentation for developers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Integrate Z-Chatbot AI into your applications with our REST API.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Settings className="h-8 w-8 mb-2" />
                <CardTitle>Configuration</CardTitle>
                <CardDescription>
                  Customize your AI assistant settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn how to personalize your AI's behavior and responses.
                </p>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Sign up for a Z-Chatbot AI account</li>
                    <li>Navigate to the Chat interface</li>
                    <li>Start typing your questions or requests</li>
                    <li>Receive intelligent AI-powered responses</li>
                    <li>Explore advanced features in your settings</li>
                  </ol>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="font-semibold mb-1">Natural Language Processing</h3>
                      <p className="text-muted-foreground">
                        Our AI understands context and nuance in your conversations.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Real-time Responses</h3>
                      <p className="text-muted-foreground">
                        Get instant replies with minimal latency.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Conversation Memory</h3>
                      <p className="text-muted-foreground">
                        The AI remembers context throughout your conversation session.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">API Example</h2>
              <Card>
                <CardContent className="pt-6">
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                    <code>{`curl -X POST https://api.z-chatbot-ai.com/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello, how can you help me today?",
    "conversation_id": "optional-conversation-id"
  }'`}</code>
                  </pre>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
