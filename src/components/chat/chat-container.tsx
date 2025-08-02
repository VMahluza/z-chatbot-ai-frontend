import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatContainerProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  height?: string;
}

export function ChatContainer({ 
  title = "Z-Chatbot AI Assistant",
  description = "Your intelligent conversation partner",
  children,
  className,
  height = "h-[600px]"
}: ChatContainerProps) {
  return (
    <Card className={cn("w-full flex flex-col overflow-hidden", height, className)}>
      <CardHeader className="border-b flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        {children}
      </CardContent>
    </Card>
  );
}
