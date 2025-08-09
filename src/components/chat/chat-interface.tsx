'use client';

import { useState, useEffect, useCallback } from "react";
import { ChatContainer } from "./chat-container";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { ChatService, ChatMessage } from "@/app/chat/actions";
import { useToast } from "@/hooks/use-toast";
import { WsConnectStatus } from "@/types/chat/wsConnectStatus";




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
  wsUrl,
  className,
  height,
  autoConnect = true,

}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionState, setConnectionState] = useState<WsConnectStatus>(WsConnectStatus.Closed);
  const [chatService] = useState(() => new ChatService(wsUrl));
  const [hasShownInitialConnection, setHasShownInitialConnection] = useState(false);
  const [draft, setDraft] = useState("");
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
      setHasShownInitialConnection(true);
      // Only show success toast after the initial connection or reconnection
      if (hasShownInitialConnection) {
        setConnectionState(WsConnectStatus.Open);
        toast({
          title: "Reconnected",
          description: "Successfully reconnected to chat server",
        });
      }
    } else {
      // Only show disconnection toast if we were previously connected
      if (hasShownInitialConnection) {
        setConnectionState(WsConnectStatus.Closed);
        toast({
          title: "Disconnected",
          description: "Lost connection to chat server. Attempting to reconnect...",
          variant: "destructive",
        });
      }
    }
  }, [toast, hasShownInitialConnection]);

  // Initialize chat service
  useEffect(() => {
    const unsubscribeMessage = chatService.onMessage(handleNewMessage);
    const unsubscribeConnection = chatService.onConnectionChange(handleConnectionChange);

    if (autoConnect && !chatService.isConnected()) {
      // Add a small delay to ensure component is fully mounted
      const timeoutId = setTimeout(async () => {
        try {
          await chatService.connect();
        } catch (error) {
          console.error("Failed to connect:", error);
          // Only show toast if the error is not a simple connection timeout
          if (error instanceof Error && !error.message.includes('timeout')) {
            toast({
              title: "Connection Failed",
              description: "Failed to connect to chat server. Auto-reconnection will be attempted.",
              variant: "destructive",
            });
          }
        }
      }, 500); // 500ms delay

      return () => {
        clearTimeout(timeoutId);
        unsubscribeMessage();
        unsubscribeConnection();
        chatService.disconnect();
      };
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
       setConnectionState(WsConnectStatus.Connecting);
      return;
    }

    try {
      await chatService.connect();
    } catch (error) {
      console.error("Failed to connect:", error);
      setConnectionState(WsConnectStatus.Error);
      toast({
        title: "Connection Failed", 
        description: "Failed to connect to chat server. Auto-reconnection will be attempted.",
        variant: "destructive",
      });
    }
  };

  const handleUseExample = (text: string) => {
    setDraft(text); // just prefill; or call handleSendMessage(text) to send immediately
  };

  return (
    <ChatContainer 
      title={title}
      description={description}
      className={className}
      height={height}
      status={connectionState}
    >
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        onUseExample={handleUseExample}
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
        value={draft}
        onChangeValue={setDraft}
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
