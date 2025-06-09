// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';

interface ChatMessage {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

@Injectable()
export class ChatService {
  // In-memory messages for now (later use MongoDB)
  private messages: ChatMessage[] = [];

  async saveMessage(message: ChatMessage) {
    this.messages.push(message);
    return message;
  }

  async getMessagesBetweenUsers(user1Id: string, user2Id: string): Promise<ChatMessage[]> {
    return this.messages.filter(
      (msg) =>
        (msg.senderId === user1Id && msg.receiverId === user2Id) ||
        (msg.senderId === user2Id && msg.receiverId === user1Id),
    );
  }
}
