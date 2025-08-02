'use client';

import { useState, useEffect, useCallback } from "react";
import { ChatContainer } from "./chat-container";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { ChatService, ChatMessage } from "@/app/chat/actions";
import { useToast } from "@/hooks/use-toast";

interface ChatInterfaceProps {
  title?: string;
  description?: string;
  wsUrl?: string;
  className?: string;
  height?: string;
  autoConnect?: boolean;
}

export function ChatInterface({ 
  title,
  description,
  wsUrl = 'ws://localhost:8000/ws/chat/',
  className,
  height,
  autoConnect = true
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatService] = useState(() => new ChatService(wsUrl));
  const { toast } = useToast();

  // Handle new messages
  const handleNewMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
    setIsLoading(false);
  }, []);

  // Handle connection changes
  const handleConnectionChange = useCallback((connected: boolean) => {
    setIsConnected(connected);
    if (connected) {
      toast({
        title: "Connected",
        description: "Successfully connected to chat server",
      });
    } else {
      toast({
        title: "Disconnected",
        description: "Lost connection to chat server",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Initialize chat service
  useEffect(() => {
    const unsubscribeMessage = chatService.onMessage(handleNewMessage);
    const unsubscribeConnection = chatService.onConnectionChange(handleConnectionChange);

    if (autoConnect) {
      chatService.connect().catch((error) => {
        console.error("Failed to connect:", error);
        toast({
          title: "Connection Failed",
          description: "Failed to connect to chat server",
          variant: "destructive",
        });
      });
    }

    return () => {
      unsubscribeMessage();
      unsubscribeConnection();
      chatService.disconnect();
    };
  }, [chatService, handleNewMessage, handleConnectionChange, autoConnect, toast]);

  const handleSendMessage = async (content: string) => {
    if (!isConnected) {
      toast({
        title: "Not Connected",
        description: "Please wait for connection to be established",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await chatService.sendMessage(content);
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsLoading(false);
      toast({
        title: "Message Failed",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleConnect = async () => {
    try {
      await chatService.connect();
    } catch (error) {
      console.error("Failed to connect:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to chat server",
        variant: "destructive",
      });
    }
  };

  return (
    <ChatContainer 
      title={title}
      description={description}
      className={className}
      height={height}
    >
      <ChatMessages 
        messages={messages}
        isLoading={isLoading}
      />
      
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={!isConnected}
        placeholder={
          isConnected 
            ? "Type your message..." 
            : "Connecting to chat server..."
        }
      />
      
      {!isConnected && (
        <div className="p-4 border-t bg-muted/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Connection Status: {chatService.getConnectionState()}
            </span>
            <button 
              onClick={handleConnect}
              className="text-sm text-primary hover:underline"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}
    </ChatContainer>
  );
}
