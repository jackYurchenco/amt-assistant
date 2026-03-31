import { CreateLetterUseCase } from "./create-letter.use-case";
import { ILetterRepository } from "../../domain/letter.repository.interface";
import { mock, MockProxy } from "jest-mock-extended";
import { CreateLetterCommand } from "./create-letter.comman";

describe('CreateLetterUseCase', () => {
  let useCase: CreateLetterUseCase;
  let mockRepository: MockProxy<ILetterRepository>;

  beforeEach(() => {
    mockRepository = mock<ILetterRepository>();
    mockRepository.save.mockResolvedValue(undefined);
    useCase = new CreateLetterUseCase(mockRepository);
  });

  it('should successfully create a letter and call repository.save', async () => {
    const command = new CreateLetterCommand(
      "Test Letter",
      "Test UserID",
      "Test Sender"
    );
    const result = await useCase.execute(command);

    expect(result).toBeDefined();
    expect(result.title).toBe(command.title);
    expect(mockRepository.save).toHaveBeenCalled();
  });
});
