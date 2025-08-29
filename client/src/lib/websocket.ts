import { useToast } from '@/hooks/use-toast';

class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000; // Start with 1 second
  private maxReconnectTimeout = 30000; // Max 30 seconds
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    // Get the current hostname and port
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const hostname = window.location.hostname;
    const port = window.location.port || '8080'; // Default to 8080 if port is not specified
    
    // Construct the WebSocket URL with the token
    const wsUrl = `${protocol}//${hostname}:${port}/ws${this.token ? `?token=${encodeURIComponent(this.token)}` : ''}`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.reconnectTimeout = 1000;
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    this.reconnectTimeout = Math.min(
      this.reconnectTimeout * 2,
      this.maxReconnectTimeout
    );

    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      this.connect();
    }, this.reconnectTimeout);
  }

  private handleMessage(data: any) {
    // Handle different message types
    switch (data.type) {
      case 'connected':
        console.log('WebSocket connection established:', data.message);
        break;
      case 'article_verified':
        console.log('Article verified:', data.data);
        break;
      case 'article_disproven':
        console.log('Article disproven:', data.data);
        break;
      default:
        console.log('Received message:', data);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  updateToken(token: string | null) {
    this.token = token;
    // Reconnect with new token if connected
    if (this.ws) {
      this.disconnect();
      this.connect();
    }
  }
}

// Create a singleton instance
export const websocket = new WebSocketClient();

// Export a hook to use the WebSocket client
export function useWebSocket() {
  const { toast } = useToast();

  const connect = () => {
    try {
      websocket.connect();
    } catch (error) {
      toast({
        title: 'Connection Error',
        description: 'Failed to connect to real-time updates',
        variant: 'destructive',
      });
    }
  };

  const disconnect = () => {
    websocket.disconnect();
  };

  return {
    connect,
    disconnect,
  };
} 