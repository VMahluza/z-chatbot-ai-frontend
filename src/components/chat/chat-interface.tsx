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
    setMessages(prev => {
      // Avoid duplicate messages by checking if the message already exists
      const isDuplicate = prev.some(m => 
        m.content === message.content && 
        m.type === message.type && 
        Math.abs(m.timestamp.getTime() - message.timestamp.getTime()) < 1000
      );
      
      if (isDuplicate) {
        return prev;
      }
      
      return [...prev, message];
    });
    
    // Only clear loading state when bot responds, since user messages are added immediately
    if (message.type === 'bot') {
      setIsLoading(false);
    }
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

    if (autoConnect && !chatService.isConnected()) {
      chatService.connect().catch((error) => {
        console.error("Failed to connect:", error);
        toast({
          title: "Connection Failed",
          description: "Failed to connect to chat server. Auto-reconnection will be attempted.",
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
      // ChatService.sendMessage() already handles adding the user message to handlers
      await chatService.sendMessage(content);
      // Loading state will be cleared when bot response is received via handleNewMessage
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
    // Check if already connected or connecting to avoid duplicate attempts
    if (chatService.isConnected() || chatService.getConnectionState() === 'connecting') {
      return;
    }

    try {
      await chatService.connect();
    } catch (error) {
      console.error("Failed to connect:", error);
      toast({
        title: "Connection Failed", 
        description: "Failed to connect to chat server. Auto-reconnection will be attempted.",
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
            : chatService.getConnectionState() === 'connecting'
              ? "Connecting to chat server..."
              : "Disconnected from chat server..."
        }
      />
      
      {!isConnected && (
        <div className="p-4 border-t bg-muted/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Connection Status: {chatService.getConnectionState()}
              {chatService.getConnectionState() === 'connecting' && " (Auto-reconnecting...)"}
            </span>
            {chatService.getConnectionState() !== 'connecting' && (
              <button 
                onClick={handleConnect}
                className="text-sm text-primary hover:underline"
              >
                Retry Connection
              </button>
            )}
          </div>
        </div>
      )}
    </ChatContainer>
  );
}
