import { MainLayout } from "@/components/main-layout";
import { ChatHeader, ChatInterface } from "@/components/chat";

export default function ChatPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6 max-w-6xl">
        <div className="max-w-4xl mx-auto">
          <ChatHeader />
          <ChatInterface autoConnect={true} />
        </div>
      </div>
    </MainLayout>
  );
}
