import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from './login.use-case';
import { HasherService } from '@amt-assistant/util-crypto';
import { TokenService, TokenGenerationException } from '@amt-assistant/util-token';
import { Email, RawPassword } from '@amt-assistant/domain';
import { UnauthorizedException } from '@amt-assistant/exceptions';
import { GetUserByEmailUseCase } from '@amt-assistant/users';
import { CreateSessionUseCase } from '@amt-assistant/sessions';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let getUserByEmailUseCase: jest.Mocked<GetUserByEmailUseCase>;
  let createSessionUseCase: jest.Mocked<CreateSessionUseCase>;
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
          provide: CreateSessionUseCase,
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
    createSessionUseCase = module.get(CreateSessionUseCase);
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
      id: { getValue: (): string => '550e8400-e29b-41d4-a716-446655440000' },
      email: { getValue: (): string => 'test@example.com' },
      passwordHash: { getValue: (): string => 'hashedPassword' },
    } as unknown as Awaited<ReturnType<GetUserByEmailUseCase['execute']>>);
    hasherService.compare.mockResolvedValue(false);

    await expect(
      useCase.execute({
        email: Email.create('test@example.com'),
        password: RawPassword.create('wrongPassword'),
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw TokenGenerationException if tokens are not generated', async () => {
    getUserByEmailUseCase.execute.mockResolvedValue({
      id: { getValue: (): string => '550e8400-e29b-41d4-a716-446655440000' },
      email: { getValue: (): string => 'test@example.com' },
      passwordHash: { getValue: (): string => 'hashedPassword' },
    } as unknown as Awaited<ReturnType<GetUserByEmailUseCase['execute']>>);
    hasherService.compare.mockResolvedValue(true);
    tokenService.generateTokens.mockRejectedValue(new TokenGenerationException('JWT Service Down'));

    await expect(
      useCase.execute({
        email: Email.create('test@example.com'),
        password: RawPassword.create('password'),
      }),
    ).rejects.toThrow(TokenGenerationException);
  });

  it('should return login response on successful login', async () => {
    const mockUser = {
      id: { getValue: (): string => '550e8400-e29b-41d4-a716-446655440000' },
      email: { getValue: (): string => 'test@example.com' },
      passwordHash: { getValue: (): string => 'hashedPassword' },
    };
    const tokens = {
      accessToken: 'access',
      refreshToken: 'refresh',
    };

    getUserByEmailUseCase.execute.mockResolvedValue(mockUser as unknown as Awaited<ReturnType<GetUserByEmailUseCase['execute']>>);
    hasherService.compare.mockResolvedValue(true);
    tokenService.generateTokens.mockResolvedValue(tokens);
    createSessionUseCase.execute.mockResolvedValue(undefined);

    const result = await useCase.execute({
      email: Email.create('test@example.com'),
      password: RawPassword.create('password'),
    });

    expect(createSessionUseCase.execute).toHaveBeenCalledWith({
      userId: '550e8400-e29b-41d4-a716-446655440000',
      refreshToken: 'refresh',
      userAgent: undefined,
    });

    expect(result).toEqual({
      ...tokens,
      user: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
      },
    });
  });
});
