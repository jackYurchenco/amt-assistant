import { Test, TestingModule } from '@nestjs/testing';
import { GetLetterByIdUseCase } from './get-letter-by-id.use-case';
import { LetterRepository } from '../../domain/letter.repository';
import { Letter } from '../../domain/letter.entity';
import { NotFoundException } from '@nestjs/common';
import { LetterStatus } from '@amt-assistant/contracts';
import { UserId } from '@amt-assistant/domain';

describe('GetLetterByIdUseCase', () => {
  let useCase: GetLetterByIdUseCase;
  let letterRepository: LetterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetLetterByIdUseCase,
        {
          provide: LetterRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetLetterByIdUseCase>(GetLetterByIdUseCase);
    letterRepository = module.get<LetterRepository>(LetterRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a letter when found', async () => {
    const letter = Letter.restore({
      id: '550e8400-e29b-41d4-a716-446655440000',
      userId: '550e8400-e29b-41d4-a716-446655440001',
      title: 'Test Letter',
      status: LetterStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    (letterRepository.findById as jest.Mock).mockResolvedValue(letter);

    const result = await useCase.execute({ id: '550e8400-e29b-41d4-a716-446655440002' });

    expect(result).toEqual(letter);
    expect(letterRepository.findById).toHaveBeenCalledWith(
      UserId.create('550e8400-e29b-41d4-a716-446655440002')
    );
  });

  it('should throw a NotFoundException when letter is not found', async () => {
    (letterRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute({ id: '550e8400-e29b-41d4-a716-446655440002' })).rejects.toThrow(
      new NotFoundException('Letter with ID 550e8400-e29b-41d4-a716-446655440002 not found'),
    );
    expect(letterRepository.findById).toHaveBeenCalledWith(
      UserId.create('550e8400-e29b-41d4-a716-446655440002')
    );
  });
});
