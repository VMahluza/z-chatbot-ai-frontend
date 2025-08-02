import { MainLayout } from "@/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Bot } from "lucide-react";

export default function ChatPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Chat Interface</h1>
            <p className="text-muted-foreground">
              Start a conversation with our AI assistant
            </p>
          </div>

          <Card className="w-full h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Z-Chatbot AI Assistant
              </CardTitle>
              <CardDescription>
                Your intelligent conversation partner
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Chat Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-muted/20">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-background rounded-lg p-3 max-w-[80%] shadow-sm">
                      <p className="text-sm">
                        Hello! I'm your AI assistant. How can I help you today?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled
                    />
                  </div>
                  <Button disabled>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This is a demo interface. Full chat functionality coming soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
