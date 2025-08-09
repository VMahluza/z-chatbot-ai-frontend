import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { WsConnectStatus } from "@/types/chat/wsConnectStatus";
import { ChatStatus } from "@/components/chat/chat-status";

interface ChatContainerProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  height?: string;
  status: WsConnectStatus;
}

export function ChatContainer({ 
  title = "Z-Chatbot AI Assistant",
  description = "Your intelligent conversation partner",
  children,
  className,
  height = "h-[600px]",
  status
}: ChatContainerProps) {
  return (
    <Card className={cn("w-full flex flex-col overflow-hidden", height, className)}>
      <CardHeader className="border-b flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {title}
          </CardTitle>
          <ChatStatus status={status} />
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <div className="flex-1 flex justify-center overflow-hidden">
        <CardContent className="flex flex-col p-0 px-2 sm:px-0 min-h-0 w-full max-w-[640px] flex-shrink-0">
          {children}
        </CardContent>
      </div>
    </Card>
  );
}
