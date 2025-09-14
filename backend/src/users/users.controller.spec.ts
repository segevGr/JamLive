import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { BadRequestException } from '@nestjs/common';
import { UserRole } from './user.schema';

describe('UsersController (unit)', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockUsersService = {
      createUser: jest.fn().mockResolvedValue({ _id: '123' }),
      updateInstrument: jest.fn().mockResolvedValue({ instrument: 'Guitar' }),
      updatePassword: jest
        .fn()
        .mockResolvedValue({ _id: '123', userName: 'john' }),
      deleteAccount: jest.fn().mockResolvedValue(undefined),
      getUsersList: jest
        .fn()
        .mockResolvedValue([{ id: '123', userName: 'john' }]),
      validateNotSelfAction: jest.fn(),
      isProtectedUser: jest.fn(),
      changeUserRole: jest
        .fn()
        .mockResolvedValue({ id: '456', role: UserRole.ADMIN }),
      deleteUser: jest.fn().mockResolvedValue(undefined),
    };

    mockAuthService = {
      generateJwtForUser: jest.fn().mockReturnValue('mocked-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signup should call usersService.createUser with correct params', async () => {
    const result = await controller.signup({
      userName: 'john',
      password: '1234',
      instrument: 'Guitar',
    });

    expect(mockUsersService.createUser).toHaveBeenCalledWith(
      'john',
      '1234',
      UserRole.USER,
      'Guitar',
    );
    expect(result).toEqual({
      message: 'User created successfully',
      userId: '123',
    });
  });

  it('signup should throw BadRequestException if instrument invalid', async () => {
    await expect(
      controller.signup({
        userName: 'john',
        password: '1234',
        instrument: 'banana',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('updateInstrument should call usersService.updateInstrument', async () => {
    const req = { user: { userId: '123' } };
    const result = await controller.updateInstrument(req, {
      instrument: 'Guitar',
    });

    expect(mockUsersService.updateInstrument).toHaveBeenCalledWith(
      '123',
      'Guitar',
    );
    expect(result).toEqual({
      message: 'Instrument updated',
      instrument: 'Guitar',
    });
  });

  it('updatePassword should return new token', async () => {
    const req = { user: { userId: '123' } };
    const result = await controller.updatePassword(req, {
      currentPassword: 'oldpass',
      newPassword: 'newpass',
      confirmNewPassword: 'newpass',
    });

    expect(mockUsersService.updatePassword).toHaveBeenCalledWith(
      '123',
      'oldpass',
      'newpass',
    );
    expect(result.token).toBe('mocked-jwt-token');
  });

  it('getUsersList should return list from service', async () => {
    const req = { user: { userId: '123' } };
    const result = await controller.getUsersList(req);
    expect(result.users).toHaveLength(1);
  });
});
