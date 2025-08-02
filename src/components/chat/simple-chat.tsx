import { ChatContainer, ChatMessages, ChatInput } from "@/components/chat";
import { ChatMessage } from "@/app/chat/actions";

interface SimpleChatProps {
  title?: string;
  description?: string;
  initialMessages?: ChatMessage[];
  onMessage?: (message: string) => void;
  disabled?: boolean;
}

export function SimpleChat({ 
  title,
  description,
  initialMessages = [],
  onMessage,
  disabled = false
}: SimpleChatProps) {
  const handleSendMessage = async (content: string) => {
    if (onMessage) {
      onMessage(content);
    } else {
      console.log("Message sent:", content);
    }
  };

  return (
    <ChatContainer 
      title={title}
      description={description}
      height="h-[400px]"
    >
      <ChatMessages messages={initialMessages} />
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={disabled}
        placeholder="Type a message..."
      />
    </ChatContainer>
  );
}
