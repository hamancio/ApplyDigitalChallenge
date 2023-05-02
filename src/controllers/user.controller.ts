import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post()
    async create(@Body() body: { username: string; password: string }): Promise<{ token: string }> {
        const { username, password } = body;
        const existingUser = await this.userService.findByUsername(username);
        if (existingUser) {
            throw new UnauthorizedException('Username already taken');
        }
        const user = await this.userService.create(username, password);
        const token = await this.authService.generateToken(user);
        return { token };
    }

    @Post('login')
    async login(@Body() body: { username: string; password: string }): Promise<{ token: string }> {
        const { username, password } = body;
        const user = await this.userService.findByUsername(username);
        if (!user || !(await this.authService.verifyPassword(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const token = await this.authService.generateToken(user);
        return { token };
    }
}
