import { Test, TestingModule } from '@nestjs/testing';
import { GetLetterByIdUseCase } from './get-letter-by-id.use-case';
import { LetterRepository } from '../../domain/letter.repository';
import { Letter } from '../../domain/letter.entity';
import { NotFoundException } from '@nestjs/common';
import { LetterStatus } from '@amt-assistant/contracts';

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
      id: '1',
      userId: '1',
      title: 'Test Letter',
      status: LetterStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    (letterRepository.findById as jest.Mock).mockResolvedValue(letter);

    const result = await useCase.execute({ id: '1' });

    expect(result).toEqual(letter);
    expect(letterRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should throw a NotFoundException when letter is not found', async () => {
    (letterRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute({ id: '1' })).rejects.toThrow(
      new NotFoundException('Letter with ID 1 not found'),
    );
    expect(letterRepository.findById).toHaveBeenCalledWith('1');
  });
});
