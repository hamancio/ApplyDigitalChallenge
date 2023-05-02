import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({
    description: 'Username and password of the new user',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Returns a token after successfully creating a new user',
  })
  @ApiBadRequestResponse({
    description: 'The specified username is already taken',
  })
  @Post()
  async create(@Body() body: CreateUserDto): Promise<{ token: string }> {
    const { username, password } = body;
    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new UnauthorizedException(
        'The specified username is already taken',
      );
    }
    const user = await this.userService.create(username, password);
    const token = await this.authService.generateToken(user);
    return { token };
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'Username and password of the user',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a token after successful login',
  })
  @ApiUnauthorizedResponse({
    description: 'The specified credentials are invalid',
  })
  @Post('login')
  async login(@Body() body: CreateUserDto): Promise<{ token: string }> {
    const { username, password } = body;
    const user = await this.userService.findByUsername(username);
    if (
      !user ||
      !(await this.authService.verifyPassword(password, user.password))
    ) {
      throw new UnauthorizedException('The specified credentials are invalid');
    }
    const token = await this.authService.generateToken(user);
    return { token };
  }
}
