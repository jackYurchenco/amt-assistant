import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from './login.use-case';
import { AuthUserReader } from '../domain/ports/auth-user-reader.port';
import { AuthUser } from '../domain/auth-user.entity';
import { HasherService } from '@amt-assistant/util-crypto';
import { TokenService } from '@amt-assistant/util-token';

import { Email, RawPassword } from '@amt-assistant/domain';
import { AuthSessionWriter } from '../domain/ports/auth-session-writer.port';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let authUserReader: jest.Mocked<AuthUserReader>;
  let hasherService: jest.Mocked<HasherService>;
  let tokenService: jest.Mocked<TokenService>;
  let authSessionWriter: jest.Mocked<AuthSessionWriter>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: AuthUserReader,
          useValue: {
            getUserByEmail: jest.fn(),
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
        {
          provide: AuthSessionWriter,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
    authUserReader = module.get(AuthUserReader);
    hasherService = module.get(HasherService);
    tokenService = module.get(TokenService);
    authSessionWriter = module.get(AuthSessionWriter);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should throw InvalidCredentialsException if user is not found', async () => {
    authUserReader.getUserByEmail.mockResolvedValue(null);

    await expect(
      useCase.execute({
        email: Email.create('test@example.com'),
        password: RawPassword.create('password'),
      }),
    ).rejects.toThrow(InvalidCredentialsException);
  });

  it('should throw InvalidCredentialsException if password is invalid', async () => {
    authUserReader.getUserByEmail.mockResolvedValue(AuthUser.restore({
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
    }));
    hasherService.compare.mockResolvedValue(false);

    await expect(
      useCase.execute({
        email: Email.create('test@example.com'),
        password: RawPassword.create('wrongPassword'),
      }),
    ).rejects.toThrow(InvalidCredentialsException);
  });

  it('should throw InternalServerErrorException if tokens are not generated', async () => {
    authUserReader.getUserByEmail.mockResolvedValue(AuthUser.restore({
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
    }));
    hasherService.compare.mockResolvedValue(true);
    tokenService.generateTokens.mockRejectedValue(new Error('JWT Service Down'));

    await expect(
      useCase.execute({
        email: Email.create('test@example.com'),
        password: RawPassword.create('password'),
      }),
    ).rejects.toThrow(Error);
  });

  it('should return login response on successful login', async () => {
    const user = AuthUser.restore({
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
    });
    const tokens = {
      accessToken: 'access',
      refreshToken: 'refresh',
    };

    authUserReader.getUserByEmail.mockResolvedValue(user);
    hasherService.compare.mockResolvedValue(true);
    tokenService.generateTokens.mockResolvedValue(tokens);

    const result = await useCase.execute({
      email: Email.create('test@example.com'),
      password: RawPassword.create('password'),
    });

    expect(authSessionWriter.create).toHaveBeenCalled();

    expect(result).toEqual({
      ...tokens,
      user: {
        id: user.id.getValue(),
        email: user.email.getValue(),
      },
    });
  });
});
