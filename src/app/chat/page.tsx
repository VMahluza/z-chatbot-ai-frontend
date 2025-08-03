import { ChatHeader, ChatInterface } from "@/components/chat";

export default function ChatPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-6xl h-screen flex flex-col">
      <div className="max-w-4xl mx-auto flex flex-col flex-1 min-h-0">
        <ChatHeader />
        <div className="flex-1 min-h-0">
          <ChatInterface autoConnect={true} height="h-full" />
        </div>
      </div>
    </div>
  );
}
