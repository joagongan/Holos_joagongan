export interface ChatMessage {
  id: number;
  text: string;
  creationDate: Date; 
  fromUser: number;
  toUser: number;
}

export interface BaseUser {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
  imageProfile?: string;
}