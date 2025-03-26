export interface ChatMessage {
    id: number;
    text: string;
    creationDate: string; 
    fromUser: {
      id: number;
    };
    toUser: {
      id: number;
    };
    
  }
  