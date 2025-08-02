import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/app/chat/actions";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
  className?: string;
}

export function ChatMessage({ message, className }: ChatMessageProps) {
  const isBot = message.type === 'bot';
  
  return (
    <div className={cn(
      "flex w-full group",
      isBot ? "justify-start" : "justify-end",
      className
    )}>
      <div className={cn(
        "flex items-start gap-3 max-w-[85%]",
        isBot ? "flex-row" : "flex-row-reverse"
      )}>
        <Avatar className={cn(
          "w-8 h-8 shrink-0 flex items-center justify-center shadow-sm border-2 border-white",
          isBot ? "bg-primary" : "bg-blue-500"
        )}>
          {isBot ? (
            <Bot className="h-4 w-4 text-white" />
          ) : (
            <User className="h-4 w-4 text-white" />
          )}
        </Avatar>
        
        <div className={cn(
          "rounded-2xl px-4 py-2 shadow-sm relative transition-all duration-200",
          "hover:shadow-md",
          isBot 
            ? "bg-muted border border-border rounded-tl-sm" 
            : "bg-blue-500 text-white rounded-tr-sm hover:bg-blue-600"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
          <time className={cn(
            "text-xs mt-1 block",
            isBot 
              ? "text-muted-foreground" 
              : "text-blue-100 opacity-80"
          )}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </time>
        </div>
      </div>
    </div>
  );
}
