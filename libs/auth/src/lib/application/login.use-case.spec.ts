import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from './login.use-case';
import { GetUserByEmailUseCase } from '@amt-assistant/users';
import { HasherService } from '@amt-assistant/util-crypto';
import { TokenService } from '@amt-assistant/util-token';
import { UnauthorizedException, InternalServerErrorException } from '@nestjs/common';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let getUserByEmailUseCase: jest.Mocked<GetUserByEmailUseCase>;
  let hasherService: jest.Mocked<HasherService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: GetUserByEmailUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: HasherService,
          useValue: {
            compare: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {
            generateTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
    getUserByEmailUseCase = module.get(GetUserByEmailUseCase);
    hasherService = module.get(HasherService);
    tokenService = module.get(TokenService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    getUserByEmailUseCase.execute.mockResolvedValue(null);

    await expect(
      useCase.execute({ email: 'test@example.com', password: 'password' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if password is invalid', async () => {
    getUserByEmailUseCase.execute.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    hasherService.compare.mockResolvedValue(false);

    await expect(
      useCase.execute({ email: 'test@example.com', password: 'wrongPassword' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw InternalServerErrorException if tokens are not generated', async () => {
    getUserByEmailUseCase.execute.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    hasherService.compare.mockResolvedValue(true);
    tokenService.generateTokens.mockRejectedValue(new Error('JWT Service Down'));

    await expect(
      useCase.execute({ email: 'test@example.com', password: 'password' }),
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('should return login response on successful login', async () => {
    const user = {
      id: '1',
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const tokens = {
      accessToken: 'access',
      refreshToken: 'refresh',
    };

    getUserByEmailUseCase.execute.mockResolvedValue(user);
    hasherService.compare.mockResolvedValue(true);
    tokenService.generateTokens.mockResolvedValue(tokens);

    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'password',
    });

    expect(result).toEqual({
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  });
});
