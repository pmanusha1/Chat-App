import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() body: { username: string, password: string, avatarUrl: string}) {
        return this.authService.register(body.username, body.password, body.avatarUrl);
    }

    @Post('login')
    login(@Body() body: { username: string, password: string}) {
        return this.authService.login(body.username, body.password)
    }
}
