import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { MessageModule } from '../message/message.module'; // ✅ Import it

@Module({
  imports: [MessageModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
