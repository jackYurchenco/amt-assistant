import { CreateLetterUseCase } from "./create-letter.use-case";
import { ILetterRepository } from "../../domain/letter.repository.interface";
import { mock, MockProxy } from "jest-mock-extended";

describe('CreateLetterUseCase', () => {
  let useCase: CreateLetterUseCase;
  let mockRepository: MockProxy<ILetterRepository>;

  beforeEach(() => {
    mockRepository = mock<ILetterRepository>();
    mockRepository.save.mockResolvedValue(undefined);
    useCase = new CreateLetterUseCase(mockRepository);
  });

  it('should successfully create a letter and call repository.save', async () => {
    const dto = {
      title: "Test Letter",
      sender: "Test Sender",
    };

    const result = await useCase.execute(dto);

    expect(result).toBeDefined();
    expect(result.title).toBe(dto.title);
    expect(mockRepository.save).toHaveBeenCalled();
  });
});
