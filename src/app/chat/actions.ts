
export interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  response?: string;
  error?: string;
}


// Helper to read JWT from localStorage or cookies
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  // Prefer localStorage (explicitly stored on login)
  const ls = localStorage.getItem('auth_token');
  if (ls) return ls;
  // Fallback to cookie named 'token' or 'auth_token'
  const cookie = document.cookie || '';
  if (!cookie) return null;
  const parts = cookie.split(';').map(c => c.trim());
  for (const p of parts) {
    if (p.startsWith('token=')) return decodeURIComponent(p.substring(6));
    if (p.startsWith('auth_token=')) return decodeURIComponent(p.substring(11));
  }
  return null;
}


export class ChatService {
  private socket: WebSocket | null = null;
  private messageHandlers: ((message: ChatMessage) => void)[] = [];
  private connectionHandlers: ((connected: boolean) => void)[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // 1 second, will increase exponentially


  // https://cruel-buckets-smile.loca.lt/

  constructor(private wsUrl: string = process.env.WS_BACKEND_URL || '') {}

  

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      // If already connected, resolve immediately

  

      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }

      // If already connecting, wait for the current connection attempt
      if (this.socket && this.socket.readyState === WebSocket.CONNECTING) {
        const checkConnection = () => {
          if (this.socket?.readyState === WebSocket.OPEN) {
            resolve();
          } else if (this.socket?.readyState === WebSocket.CLOSED) {
            reject(new Error('Connection failed'));
          } else {
            setTimeout(checkConnection, 100);
          }
        };
        checkConnection();
        return;
      }

      try {
        // Inject token from storage/cookies if present and not already in URL
        let finalUrl = this.wsUrl;
        const token = getAuthToken();
        if (token) {
          const hasQuery = finalUrl.includes('?');
            // Avoid duplicating token param (simple contains check)
          if (!finalUrl.includes('token=')) {
            finalUrl += (hasQuery ? '&' : '?') + 'token=' + encodeURIComponent(token);
          }
        }
        this.socket = new WebSocket(finalUrl);

        const connectionTimeout = setTimeout(() => {
          if (this.socket && this.socket.readyState !== WebSocket.OPEN) {
            this.socket.close();
            reject(new Error('Connection timeout'));
          }
        }, 5000); // 5 second timeout

        this.socket.onopen = () => {
          clearTimeout(connectionTimeout);
          console.log('WebSocket connected');
          this.reconnectAttempts = 0; // Reset on successful connection
          this.notifyConnectionHandlers(true);
          resolve();
        };

        this.socket.onmessage = (event) => {
          try {
            const data: ChatResponse = JSON.parse(event.data);
            
            if (data.error) {
              console.error('Server error:', data.error);
              return;
            }

            if (data.response) {
              const message: ChatMessage = {
                type: 'bot',
                content: data.response,
                timestamp: new Date(),
              };
              this.notifyMessageHandlers(message);
            }
          } catch (error) {
            console.error('Failed to parse message:', error);
          }
        };

        this.socket.onclose = (event) => {
          clearTimeout(connectionTimeout);
          console.log('WebSocket disconnected:', event.code, event.reason);
          this.notifyConnectionHandlers(false);
          
          // Attempt to reconnect if not a clean close
          if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.attemptReconnect();
          }
        };

        this.socket.onerror = (error) => {
          clearTimeout(connectionTimeout);
          console.error('WebSocket error:', error);
          this.notifyConnectionHandlers(false);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private async attemptReconnect(): Promise<void> {
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff
    
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms...`);
    
    setTimeout(async () => {
      try {
        await this.connect();
      } catch (error) {
        console.error('Reconnection failed:', error);
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          console.error('Max reconnection attempts reached');
        }
      }
    }, delay);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close(1000, 'Client disconnecting'); // Clean close
      this.socket = null;
    }
  }

  sendMessage(content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket is not connected'));
        return;
      }

      if (!content.trim()) {
        reject(new Error('Message cannot be empty'));
        return;
      }

      try {
        this.socket.send(JSON.stringify({ message: content.trim() }));
        
        // Add the user message to the message handlers
        const userMessage: ChatMessage = {
          type: 'user',
          content: content.trim(),
          timestamp: new Date(),
        };
        this.notifyMessageHandlers(userMessage);
        
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  onMessage(handler: (message: ChatMessage) => void): () => void {
    this.messageHandlers.push(handler);
    
    // Return unsubscribe function
    return () => {
      const index = this.messageHandlers.indexOf(handler);
      if (index > -1) {
        this.messageHandlers.splice(index, 1);
      }
    };
  }

  onConnectionChange(handler: (connected: boolean) => void): () => void {
    this.connectionHandlers.push(handler);
    
    // Return unsubscribe function
    return () => {
      const index = this.connectionHandlers.indexOf(handler);
      if (index > -1) {
        this.connectionHandlers.splice(index, 1);
      }
    };
  }

  private notifyMessageHandlers(message: ChatMessage): void {
    this.messageHandlers.forEach(handler => {
      try {
        handler(message);
      } catch (error) {
        console.error('Error in message handler:', error);
      }
    });
  }

  private notifyConnectionHandlers(connected: boolean): void {
    this.connectionHandlers.forEach(handler => {
      try {
        handler(connected);
      } catch (error) {
        console.error('Error in connection handler:', error);
      }
    });
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  getConnectionState(): string {
    if (!this.socket) return 'disconnected';
    
    switch (this.socket.readyState) {
      case WebSocket.CONNECTING: return 'connecting';
      case WebSocket.OPEN: return 'connected';
      case WebSocket.CLOSING: return 'closing';
      case WebSocket.CLOSED: return 'disconnected';
      default: return 'unknown';
    }
  }
}

// Singleton instance for global use
export const chatService = new ChatService();
