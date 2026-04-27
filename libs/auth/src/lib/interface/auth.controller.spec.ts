import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../application/login.use-case';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ILoginResponse } from '@amt-assistant/contracts';
import { Email } from '@amt-assistant/domain';

describe('AuthController', () => {
  let controller: AuthController;
  let loginUseCase: LoginUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: LoginUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call loginUseCase.execute and return formatted response', async () => {

      const loginDto = new LoginDto();
      loginDto.email = 'test@example.com';
      loginDto.password = 'password123';

      const useCaseResponse: ILoginResponse = {
        accessToken: 'access_token_abc',
        refreshToken: 'refresh_token_xyz',
        user: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          email: 'test@example.com',
        },
      };

      jest.spyOn(loginUseCase, 'execute').mockResolvedValue(useCaseResponse);

      const result = await controller.login(loginDto);

      expect(loginUseCase.execute).toHaveBeenCalledWith({
        email: Email.create(loginDto.email),
        password: loginDto.password,
      });
      expect(loginUseCase.execute).toHaveBeenCalledTimes(1);

      const expectedResponse = LoginResponseDto.fromResult(useCaseResponse);
      expect(result).toEqual(expectedResponse);
    });
  });
});
