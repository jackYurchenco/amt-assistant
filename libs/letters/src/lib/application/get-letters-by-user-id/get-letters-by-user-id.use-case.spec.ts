import { GetLettersByUserIdUseCase } from './get-letters-by-user-id.use-case';
import { LetterReader } from '../../domain/ports/letter-reader.port';
import { Letter } from '../../domain/letter.entity';
import { LetterStatus } from '@amt-assistant/contracts';
import { UserId } from '@amt-assistant/domain';
import { mock, MockProxy } from 'jest-mock-extended';

describe('GetLettersByUserIdUseCase', () => {
  let useCase: GetLettersByUserIdUseCase;
  let mockReader: MockProxy<LetterReader>;

  beforeEach(() => {
    mockReader = mock<LetterReader>();
    useCase = new GetLettersByUserIdUseCase(mockReader);
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
    mockReader.findByUserId.mockResolvedValue(letters);

    const result = await useCase.execute({ userId: '550e8400-e29b-41d4-a716-446655440002' });

    expect(result).toEqual(letters);
    expect(mockReader.findByUserId).toHaveBeenCalledWith(
      UserId.create('550e8400-e29b-41d4-a716-446655440002'),
    );
  });

  it('should return an empty array if no letters are found for a given user ID', async () => {
    mockReader.findByUserId.mockResolvedValue([]);

    const result = await useCase.execute({ userId: '550e8400-e29b-41d4-a716-446655440002' });

    expect(result).toEqual([]);
    expect(mockReader.findByUserId).toHaveBeenCalledWith(
      UserId.create('550e8400-e29b-41d4-a716-446655440002'),
    );
  });
});
