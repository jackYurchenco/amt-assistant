import { GetLetterByIdUseCase } from './get-letter-by-id.use-case';
import { mock, MockProxy } from 'jest-mock-extended';
import { LetterReader } from '../../domain/ports/letter-reader.port';
import { Letter } from '../../domain/letter.entity';
import { NotFoundException } from '@nestjs/common';
import { LetterStatus } from '@amt-assistant/contracts';
import { GetLetterByIdQuery } from './get-letter-by-id.query';

describe('GetLetterByIdUseCase', () => {
  let useCase: GetLetterByIdUseCase;
  let mockReader: MockProxy<LetterReader>;

  beforeEach(() => {
    mockReader = mock<LetterReader>();
    useCase = new GetLetterByIdUseCase(mockReader);
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
    mockReader.findById.mockResolvedValue(letter);

    const query = new GetLetterByIdQuery('550e8400-e29b-41d4-a716-446655440000');
    const result = await useCase.execute(query);

    expect(result).toBeDefined();
    expect(result).toEqual(letter);
    expect(mockReader.findById).toHaveBeenCalled();
  });

  it('should throw a NotFoundException when letter is not found', async () => {
    mockReader.findById.mockResolvedValue(null);

    const query = new GetLetterByIdQuery('550e8400-e29b-41d4-a716-446655440002');

    await expect(useCase.execute(query)).rejects.toThrow(
      new NotFoundException('Letter with ID 550e8400-e29b-41d4-a716-446655440002 not found'),
    );
    expect(mockReader.findById).toHaveBeenCalled();
  });
});
