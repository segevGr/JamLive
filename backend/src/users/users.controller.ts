import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UseGuards,
  Put,
  Req,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './user.schema';
import { Instrument, instruments } from './user.instruments';
import { validateFields } from '../utils/validateFields';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  async signup(
    @Body() body: { userName: string; password: string; instrument: string },
  ) {
    const error = validateFields(body, ['userName', 'password', 'instrument']);
    if (error) {
      throw new BadRequestException(error);
    }

    if (!instruments.includes(body.instrument as Instrument)) {
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

    if (!instruments.includes(body.instrument as Instrument)) {
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

  @UseGuards(JwtAuthGuard)
  @Put('me/instrument')
  async updateInstrument(@Req() req, @Body() body: { instrument: Instrument }) {
    if (!body || !body.instrument) {
      throw new BadRequestException('Instrument is required');
    }

    if (!instruments.includes(body.instrument as Instrument)) {
      throw new BadRequestException('Invalid instrument value');
    }

    const updatedUser = await this.usersService.updateInstrument(
      req.user.userId,
      body.instrument,
    );
    return {
      message: 'Instrument updated',
      instrument: updatedUser.instrument,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('me/password')
  async updatePassword(
    @Req() req,
    @Body()
    body: {
      currentPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    },
  ) {
    if (!body) {
      throw new BadRequestException('Missing required fields');
    }
    const { currentPassword, newPassword, confirmNewPassword } = body;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      throw new BadRequestException('Missing required fields');
    }
    if (newPassword.length < 4) {
      throw new BadRequestException('Password must be at least 4 characters');
    }
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException("Passwords don't match");
    }

    const updatedUser = await this.usersService.updatePassword(
      req.user.userId,
      currentPassword,
      newPassword,
    );

    const newToken = this.authService.generateJwtForUser(updatedUser);

    return { message: 'Password updated successfully', token: newToken };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteAccount(@Req() req, @Body() body: { password: string }) {
    if (!body || !body.password) {
      throw new BadRequestException('Password is required to delete account');
    }

    await this.usersService.deleteAccount(req.user.userId, body.password);
    return { message: 'Account deleted successfully' };
  }
}
