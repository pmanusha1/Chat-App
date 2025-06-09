import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        return this.userService.findAll()
    }

    @Get('search')
    async searchUsers(@Query('q') query: string) {
        return this.userService.search(query);
    }
}
