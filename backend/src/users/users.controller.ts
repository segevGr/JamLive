import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './user.schema';
import { validateFields } from '../utils/validateFields';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('signup')
  async signup(@Body() body: { email: string; password: string; instrument: string }) {
    const error = validateFields(body, ['email', 'password', 'instrument']);
    if (error) {
      throw new BadRequestException(error);
    }

    const user = await this.usersService.createUser(
      body.email,
      body.password,
      UserRole.USER,
      body.instrument,
    );
    return { message: 'User created successfully', userId: user._id };
  }

  @Public()
  @Post('signup-admin')
  async signupAdmin(@Body() body: { email: string; password: string; instrument: string }) {
    const error = validateFields(body, ['email', 'password', 'instrument']);
    if (error) {
      throw new BadRequestException(error);
    }

    const user = await this.usersService.createUser(
      body.email,
      body.password,
      UserRole.ADMIN,
      body.instrument,
    );
    return { message: 'Admin created successfully', userId: user._id };

  }
  }
