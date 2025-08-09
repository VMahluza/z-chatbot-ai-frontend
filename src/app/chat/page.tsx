import { ChatHeader, ChatInterface } from "@/components/chat";
import { cookies } from 'next/headers'


// TODO: Send auth token to ChatService

export default async function ChatPage() {
  
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value || null;
  const wsUrl = `${process.env.WS_BACKEND_URL}?token=${token}` || 'ws://localhost:8000/ws/chat/?token=' + token;

  console.log("WebSocket URL:", wsUrl);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-6xl h-screen flex flex-col">
      <div className="max-w-4xl mx-auto flex flex-col flex-1 min-h-0">
        <ChatHeader />
        <div className="flex-1 min-h-0">
          {/* The chat Bot can only be accesed by signed in users  */}
          <ChatInterface autoConnect={true} height="h-full"  wsUrl={wsUrl} />
        </div>
      </div>
    </div>
  );
}
