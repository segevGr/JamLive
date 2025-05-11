import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { validateFields } from 'src/utils/validateFields';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: { userName: string; password: string }) {
    const error = validateFields(body, ['userName', 'password']);
    if (error) {
      throw new BadRequestException(error);
    }

    return this.authService.login(body.userName, body.password);
  }
}
