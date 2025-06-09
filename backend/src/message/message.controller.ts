import { Controller, Get, Query } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getMessages(
    @Query('user1') user1: string,
    @Query('user2') user2: string,
  ) {
    return this.messageService.getMessagesBetweenUsers(user1, user2);
  }
}
