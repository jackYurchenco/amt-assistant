import { CreateLetterUseCase } from './create-letter.use-case';
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateLetterCommand } from './create-letter.command';
import { LetterRepository } from '../../domain/letter.repository';

describe('CreateLetterUseCase', () => {
  let useCase: CreateLetterUseCase;
  let mockRepository: MockProxy<LetterRepository>;

  beforeEach(() => {
    mockRepository = mock<LetterRepository>();
    mockRepository.save.mockResolvedValue(undefined);
    useCase = new CreateLetterUseCase(mockRepository);
  });

  it('should successfully create a letter and call repository.save', async () => {
    const command = new CreateLetterCommand(
      'Title',
      '550e8400-e29b-41d4-a716-446655440000',
      'Sender',
    );
    const result = await useCase.execute(command);

    expect(result).toBeDefined();
    expect(result.title).toBe(command.title);
    expect(mockRepository.save).toHaveBeenCalled();
  });
});
