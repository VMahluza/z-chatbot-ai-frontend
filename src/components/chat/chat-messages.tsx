"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { ChatMessage as ChatMessageType } from "@/app/chat/actions";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading?: boolean;
  className?: string;
}

export function ChatMessages({ messages, isLoading, className }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight;
        }
      }
      
      // Fallback to scrollIntoView if the above doesn't work
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end'
        });
      }
    };

    // Use setTimeout to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    
    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  // Additional effect to handle immediate scrolling for rapid message updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'auto', // Use 'auto' for immediate scroll on rapid updates
        block: 'end'
      });
    }
  }, [messages.length]);

  const welcomeMessage: ChatMessageType = {
    type: 'bot',
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date()
  };

  const displayMessages = messages.length > 0 ? messages : [welcomeMessage];

  return (
    <ScrollArea 
      ref={scrollAreaRef}
      className={cn("flex-1 min-h-0 p-6 bg-muted/20", className)}
    >
      <div className="space-y-6">
        {displayMessages.map((message, index) => (
          <ChatMessage 
            key={`${message.timestamp.getTime()}-${index}`}
            message={message}
          />
        ))}
        
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-white animate-pulse" />
              </div>
              <div className="bg-muted border border-border rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.1s]" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
