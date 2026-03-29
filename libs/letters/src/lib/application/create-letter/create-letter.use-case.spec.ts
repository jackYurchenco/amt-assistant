import { CreateLetterUseCase } from "./create-letter.use-case";
import { ILetterRepository } from "../../domain/letter.repository.interface";

describe('CreateLetterUseCase', () => {
  let useCase: CreateLetterUseCase;
  let mockRepository: jest.Mocked<ILetterRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn().mockResolvedValue(undefined),
      findAll: jest.fn().mockResolvedValue(undefined),
    }

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
