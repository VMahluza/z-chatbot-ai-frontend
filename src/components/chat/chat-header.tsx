interface ChatHeaderProps {
  title?: string;
  description?: string;
}

export function ChatHeader({ 
  title = "Chat Interface", 
  description = "Start a conversation with our AI assistant" 
}: ChatHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
