'use client';

import { useState } from "react";
import { 
  ChatInterface, 
  SimpleChat, 
  ChatContainer, 
  ChatMessages, 
  ChatInput 
} from "@/components/chat";
import { ChatMessage } from "@/app/chat/actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ChatExamplesPage() {
  const [demoMessages, setDemoMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      content: 'Welcome to the demo chat! This is a simple implementation.',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);

  const handleDemoMessage = (content: string) => {
    const userMessage: ChatMessage = {
      type: 'user',
      content,
      timestamp: new Date()
    };

    const botMessage: ChatMessage = {
      type: 'bot',
      content: `You said: "${content}". This is a demo response!`,
      timestamp: new Date(Date.now() + 1000)
    };

    setDemoMessages(prev => [...prev, userMessage, botMessage]);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Chat Components Examples</h1>
        <p className="text-muted-foreground">
          Demonstrations of the modular chat components
        </p>
      </div>

      <div className="grid gap-8">
        {/* Full ChatInterface */}
        <Card>
          <CardHeader>
            <CardTitle>Full Chat Interface (WebSocket)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChatInterface 
              title="Production Chat"
              description="Full-featured chat with WebSocket connection"
              height="h-[400px]"
            />
          </CardContent>
        </Card>

        {/* Simple Chat Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Simple Chat (Demo Mode)</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChat 
              title="Demo Chat"
              description="Local demo without WebSocket"
              initialMessages={demoMessages}
              onMessage={handleDemoMessage}
            />
          </CardContent>
        </Card>

        {/* Custom Chat Implementation */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Chat Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <ChatContainer 
              title="Custom Chat"
              description="Built with individual components"
              height="h-[300px]"
            >
              <ChatMessages messages={demoMessages} />
              <ChatInput
                onSendMessage={handleDemoMessage}
                placeholder="Custom placeholder..."
              />
            </ChatContainer>
          </CardContent>
        </Card>

        {/* Side by Side Chats */}
        <Card>
          <CardHeader>
            <CardTitle>Multiple Chat Instances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <SimpleChat 
                title="Assistant A"
                description="First assistant"
                initialMessages={[{
                  type: 'bot',
                  content: 'Hello from Assistant A!',
                  timestamp: new Date()
                }]}
                onMessage={(msg) => console.log('Assistant A:', msg)}
              />
              <SimpleChat 
                title="Assistant B"
                description="Second assistant"
                initialMessages={[{
                  type: 'bot',
                  content: 'Hello from Assistant B!',
                  timestamp: new Date()
                }]}
                onMessage={(msg) => console.log('Assistant B:', msg)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Component Features Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Component Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Available Components:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><code>ChatInterface</code> - Full-featured WebSocket chat</li>
                <li><code>SimpleChat</code> - Local demo chat</li>
                <li><code>ChatContainer</code> - Chat window wrapper</li>
                <li><code>ChatMessages</code> - Message display area</li>
                <li><code>ChatMessage</code> - Individual message</li>
                <li><code>ChatInput</code> - Message input field</li>
                <li><code>ChatHeader</code> - Page header</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Auto-scrolling message area</li>
                <li>Loading states and animations</li>
                <li>Responsive design</li>
                <li>Keyboard shortcuts (Enter to send)</li>
                <li>Connection status handling</li>
                <li>Error handling and retry logic</li>
                <li>TypeScript support</li>
                <li>Modular and composable</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
