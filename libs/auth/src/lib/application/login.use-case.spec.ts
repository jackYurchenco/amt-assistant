import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from './login.use-case';
import { GetUserByEmailUseCase } from '@amt-assistant/users';
import { HasherService } from '@amt-assistant/util-crypto';
import { TokenService } from '@amt-assistant/util-token';
import { UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { Email, PasswordHash, RawPassword, UserId } from '@amt-assistant/domain';

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
      useCase.execute({
        email: Email.create('test@example.com'),
        password: RawPassword.create('password'),
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if password is invalid', async () => {
    getUserByEmailUseCase.execute.mockResolvedValue({
      id: UserId.create('550e8400-e29b-41d4-a716-446655440000'),
      email: Email.create('test@example.com'),
      passwordHash: PasswordHash.create('hashedPassword'),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    hasherService.compare.mockResolvedValue(false);

    await expect(
      useCase.execute({
        email: Email.create('test@example.com'),
        password: RawPassword.create('wrongPassword'),
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw InternalServerErrorException if tokens are not generated', async () => {
    getUserByEmailUseCase.execute.mockResolvedValue({
      id: UserId.create('550e8400-e29b-41d4-a716-446655440000'),
      email: Email.create('test@example.com'),
      passwordHash: PasswordHash.create('hashedPassword'),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    hasherService.compare.mockResolvedValue(true);
    tokenService.generateTokens.mockRejectedValue(new Error('JWT Service Down'));

    await expect(
      useCase.execute({
        email: Email.create('test@example.com'),
        password: RawPassword.create('password'),
      }),
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('should return login response on successful login', async () => {
    const user = {
      id: UserId.create('550e8400-e29b-41d4-a716-446655440000'),
      email: Email.create('test@example.com'),
      passwordHash: PasswordHash.create('hashedPassword'),
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
      email: Email.create('test@example.com'),
      password: RawPassword.create('password'),
    });

    expect(result).toEqual({
      ...tokens,
      user: {
        id: user.id.getValue(),
        email: user.email.getValue(),
      },
    });
  });
});
