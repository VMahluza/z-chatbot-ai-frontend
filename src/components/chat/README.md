# Chat Components

A collection of reusable, modular chat components for building AI chat interfaces.

## Components Overview

### `ChatInterface`
The main, fully-featured chat component with WebSocket integration.

```tsx
import { ChatInterface } from "@/components/chat";

<ChatInterface 
  title="My AI Assistant"
  description="Chat with our AI"
  wsUrl="ws://localhost:8000/ws/chat/"
  autoConnect={true}
/>
```

**Props:**
- `title?`: Chat window title
- `description?`: Chat window description  
- `wsUrl?`: WebSocket URL (default: 'ws://localhost:8000/ws/chat/')
- `className?`: Additional CSS classes
- `height?`: Container height (default: 'h-[600px]')
- `autoConnect?`: Auto-connect on mount (default: true)

### `SimpleChat`
A simplified chat component without WebSocket integration.

```tsx
import { SimpleChat } from "@/components/chat";

<SimpleChat 
  title="Demo Chat"
  initialMessages={messages}
  onMessage={(msg) => console.log(msg)}
  disabled={false}
/>
```

### `ChatContainer`
The outer container that provides the card layout and header.

```tsx
import { ChatContainer } from "@/components/chat";

<ChatContainer title="My Chat" description="Chat description">
  {/* Your chat content */}
</ChatContainer>
```

### `ChatMessages`
Displays a list of chat messages with auto-scrolling.

```tsx
import { ChatMessages } from "@/components/chat";

<ChatMessages 
  messages={messages} 
  isLoading={false}
/>
```

**Features:**
- Auto-scroll to bottom on new messages
- Loading indicator with animated dots
- Responsive message bubbles
- Timestamp display

### `ChatMessage`
Individual message component with user/bot styling.

```tsx
import { ChatMessage } from "@/components/chat";

<ChatMessage message={{
  type: 'bot',
  content: 'Hello!',
  timestamp: new Date()
}} />
```

### `ChatInput`
Input field with send button and keyboard shortcuts.

```tsx
import { ChatInput } from "@/components/chat";

<ChatInput 
  onSendMessage={(msg) => handleMessage(msg)}
  disabled={false}
  placeholder="Type a message..."
/>
```

**Features:**
- Enter to send, Shift+Enter for new line
- Loading state with spinner
- Disabled state handling
- Auto-clear on send

### `ChatHeader`
Simple header component for the chat page.

```tsx
import { ChatHeader } from "@/components/chat";

<ChatHeader 
  title="Chat Interface"
  description="Start a conversation"
/>
```

## Usage Examples

### Basic Implementation
```tsx
import { ChatInterface } from "@/components/chat";

export function MyChat() {
  return (
    <div className="max-w-4xl mx-auto">
      <ChatInterface />
    </div>
  );
}
```

### Custom Implementation
```tsx
import { 
  ChatContainer, 
  ChatMessages, 
  ChatInput 
} from "@/components/chat";

export function CustomChat() {
  const [messages, setMessages] = useState([]);
  
  const handleMessage = (content: string) => {
    // Custom message handling
    setMessages(prev => [...prev, {
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  return (
    <ChatContainer title="Custom Chat">
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleMessage} />
    </ChatContainer>
  );
}
```

### Multiple Chat Instances
```tsx
import { SimpleChat } from "@/components/chat";

export function MultiChat() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <SimpleChat title="Assistant 1" />
      <SimpleChat title="Assistant 2" />
    </div>
  );
}
```

## Styling

All components use Tailwind CSS and are fully customizable. They integrate with your existing design system through:

- CSS variables for theming
- Consistent component APIs
- Responsive design patterns
- Accessible markup

## WebSocket Integration

The `ChatInterface` component integrates with the `ChatService` from `@/app/chat/actions` which provides:

- Automatic reconnection with exponential backoff
- Connection state management
- Message queuing and error handling
- Type-safe WebSocket communication

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast support
- Focus management
