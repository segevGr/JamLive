import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthController (unit)', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      login: jest.fn().mockResolvedValue({ token: 'mocked-token' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login should call authService.login with correct params', async () => {
    const result = await controller.login({
      userName: 'john',
      password: '1234',
    });

    expect(mockAuthService.login).toHaveBeenCalledWith('john', '1234');
    expect(result).toEqual({ token: 'mocked-token' });
  });

  it('login should throw BadRequestException if missing fields', async () => {
    await expect(
      controller.login({ userName: '', password: '' }),
    ).rejects.toThrow(BadRequestException);
  });
});
