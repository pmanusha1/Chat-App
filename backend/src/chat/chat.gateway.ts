// src/chat/chat.gateway.ts
import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { ChatService } from './chat.service';
import { MessageService } from 'src/message/message.service';
  
  interface ChatMessage {
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
  }
  
  @WebSocketGateway({ cors: true })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
      private readonly chatService: ChatService,
      private readonly messageService: MessageService, // ✅ Injected
    ) {}
  
    private onlineUsers = new Map<string, string>(); // userId -> socketId
  
    handleConnection(client: Socket) {
      console.log(`Socket connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      for (const [userId, socketId] of this.onlineUsers.entries()) {
        if (socketId === client.id) {
          this.onlineUsers.delete(userId);
          break;
        }
      }
      console.log(`Socket disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('user_connected')
    handleUserConnected(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
      this.onlineUsers.set(userId, client.id);
      console.log(`User ${userId} connected with socket ${client.id}`);
    }
  
    @SubscribeMessage('send_message')
    async handleSendMessage(@MessageBody() message: ChatMessage, @ConnectedSocket() client: Socket) {
      const enrichedMessage = {
        ...message,
        timestamp: new Date().toISOString(),
      };

      await this.messageService.saveMessage(enrichedMessage); // ✅ Store in DB

      const receiverSocketId = this.onlineUsers.get(message.receiverId);
      if (receiverSocketId) {
        client.to(receiverSocketId).emit('receive_message', enrichedMessage);
      }
    }

  }
  