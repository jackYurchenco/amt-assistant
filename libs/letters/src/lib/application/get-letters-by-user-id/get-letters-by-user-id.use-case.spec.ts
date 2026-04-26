import { Test, TestingModule } from '@nestjs/testing';
import { GetLettersByUserIdUseCase } from './get-letters-by-user-id.use-case';
import { LetterRepository } from '../../domain/letter.repository';
import { Letter } from '../../domain/letter.entity';
import { LetterStatus } from '@amt-assistant/contracts';
import { UserId } from '@amt-assistant/domain';

describe('GetLettersByUserIdUseCase', () => {
  let useCase: GetLettersByUserIdUseCase;
  let letterRepository: LetterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetLettersByUserIdUseCase,
        {
          provide: LetterRepository,
          useValue: {
            findByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetLettersByUserIdUseCase>(GetLettersByUserIdUseCase);
    letterRepository = module.get<LetterRepository>(LetterRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return an array of letters for a given user ID', async () => {
    const letters = [
      Letter.restore({
        id: '550e8400-e29b-41d4-a716-446655440000',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        title: 'Test Letter 1',
        status: LetterStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Letter.restore({
        id: '550e8400-e29b-41d4-a716-446655440002',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        title: 'Test Letter 2',
        status: LetterStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];
    (letterRepository.findByUserId as jest.Mock).mockResolvedValue(letters);

    const result = await useCase.execute({ userId: '550e8400-e29b-41d4-a716-446655440002' });

    expect(result).toEqual(letters);
    expect(letterRepository.findByUserId).toHaveBeenCalledWith(
      UserId.create('550e8400-e29b-41d4-a716-446655440002')
    );
  });

  it('should return an empty array if no letters are found for a given user ID', async () => {
    (letterRepository.findByUserId as jest.Mock).mockResolvedValue([]);

    const result = await useCase.execute({ userId: '550e8400-e29b-41d4-a716-446655440002' });

    expect(result).toEqual([]);
    expect(letterRepository.findByUserId).toHaveBeenCalledWith(
      UserId.create('550e8400-e29b-41d4-a716-446655440002')
    );
  });
});
