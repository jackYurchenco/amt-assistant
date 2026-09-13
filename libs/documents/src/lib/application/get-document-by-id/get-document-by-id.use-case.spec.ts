import { GetDocumentByIdUseCase } from './get-document-by-id.use-case';
import { mock, MockProxy } from 'jest-mock-extended';
import { DocumentReader } from '../../domain/ports/document-reader.port';
import { Document } from '../../domain/document.entity';
import { NotFoundException } from '@amt-assistant/exceptions';
import { DocumentStatus } from '@amt-assistant/contracts';
import { GetDocumentByIdQuery } from './get-document-by-id.query';

describe('GetDocumentByIdUseCase', () => {
  let useCase: GetDocumentByIdUseCase;
  let mockReader: MockProxy<DocumentReader>;

  beforeEach(() => {
    mockReader = mock<DocumentReader>();
    useCase = new GetDocumentByIdUseCase(mockReader);
  });

  it('should return a document when found', async () => {
    const document = Document.restore({
      id: '550e8400-e29b-41d4-a716-446655440000',
      userId: '550e8400-e29b-41d4-a716-446655440001',
      originalName: 'invoice.pdf',
      filename: '550e8400-e29b-41d4-a716-446655440000.pdf',
      path: '/uploads/550e8400-e29b-41d4-a716-446655440000.pdf',
      mimeType: 'application/pdf',
      size: 1024,
      status: DocumentStatus.UPLOADED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockReader.findById.mockResolvedValue(document);

    const query = new GetDocumentByIdQuery('550e8400-e29b-41d4-a716-446655440000');
    const result = await useCase.execute(query);

    expect(result).toBeDefined();
    expect(result).toEqual(document);
    expect(mockReader.findById).toHaveBeenCalled();
  });

  it('should throw a NotFoundException when document is not found', async () => {
    mockReader.findById.mockResolvedValue(null);

    const query = new GetDocumentByIdQuery('550e8400-e29b-41d4-a716-446655440002');

    await expect(useCase.execute(query)).rejects.toThrow(
      new NotFoundException('Document with ID 550e8400-e29b-41d4-a716-446655440002 not found'),
    );
    expect(mockReader.findById).toHaveBeenCalled();
  });
});
