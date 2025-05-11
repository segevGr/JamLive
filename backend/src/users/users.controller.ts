import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole, Instrument } from './user.schema';
import { validateFields } from '../utils/validateFields';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('signup')
  async signup(
    @Body() body: { userName: string; password: string; instrument: string },
  ) {
    const error = validateFields(body, ['userName', 'password', 'instrument']);
    if (error) {
      throw new BadRequestException(error);
    }

    if (!Object.values(Instrument).includes(body.instrument as Instrument)) {
      throw new BadRequestException('Invalid instrument value');
    }

    const user = await this.usersService.createUser(
      body.userName,
      body.password,
      UserRole.USER,
      body.instrument as Instrument,
    );
    return { message: 'User created successfully', userId: user._id };
  }

  @Public()
  @Post('signup-admin')
  async signupAdmin(
    @Body() body: { userName: string; password: string; instrument: string },
  ) {
    const error = validateFields(body, ['userName', 'password', 'instrument']);
    if (error) {
      throw new BadRequestException(error);
    }

    if (!Object.values(Instrument).includes(body.instrument as Instrument)) {
      throw new BadRequestException('Invalid instrument value');
    }

    const user = await this.usersService.createUser(
      body.userName,
      body.password,
      UserRole.ADMIN,
      body.instrument as Instrument,
    );
    return { message: 'Admin created successfully', userId: user._id };
  }
}
