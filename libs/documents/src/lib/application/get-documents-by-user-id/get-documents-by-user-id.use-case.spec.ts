import { GetDocumentsByUserIdUseCase } from './get-documents-by-user-id.use-case';
import { DocumentReader } from '../../domain/ports/document-reader.port';
import { Document } from '../../domain/document.entity';
import { DocumentStatus } from '@amt-assistant/contracts';
import { UserId } from '@amt-assistant/domain';
import { mock, MockProxy } from 'jest-mock-extended';
import { GetDocumentsByUserIdQuery } from './get-documents-by-user-id.query';

describe('GetDocumentsByUserIdUseCase', () => {
  let useCase: GetDocumentsByUserIdUseCase;
  let mockReader: MockProxy<DocumentReader>;

  beforeEach(() => {
    mockReader = mock<DocumentReader>();
    useCase = new GetDocumentsByUserIdUseCase(mockReader);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return an array of documents for a given user ID', async () => {
    const documents = [
      Document.restore({
        id: '550e8400-e29b-41d4-a716-446655440000',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        originalName: 'doc1.pdf',
        filename: '550e8400-e29b-41d4-a716-446655440000.pdf',
        path: '/uploads/550e8400-e29b-41d4-a716-446655440000.pdf',
        mimeType: 'application/pdf',
        size: 1024,
        status: DocumentStatus.UPLOADED,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Document.restore({
        id: '550e8400-e29b-41d4-a716-446655440002',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        originalName: 'doc2.pdf',
        filename: '550e8400-e29b-41d4-a716-446655440002.pdf',
        path: '/uploads/550e8400-e29b-41d4-a716-446655440002.pdf',
        mimeType: 'application/pdf',
        size: 2048,
        status: DocumentStatus.UPLOADED,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];
    mockReader.findByUserId.mockResolvedValue(documents);

    const query = new GetDocumentsByUserIdQuery('550e8400-e29b-41d4-a716-446655440001');
    const result = await useCase.execute(query);

    expect(result).toEqual(documents);
    expect(mockReader.findByUserId).toHaveBeenCalledWith(
      UserId.create('550e8400-e29b-41d4-a716-446655440001'),
    );
  });

  it('should return an empty array if no documents are found for a given user ID', async () => {
    mockReader.findByUserId.mockResolvedValue([]);

    const query = new GetDocumentsByUserIdQuery('550e8400-e29b-41d4-a716-446655440001');
    const result = await useCase.execute(query);

    expect(result).toEqual([]);
    expect(mockReader.findByUserId).toHaveBeenCalledWith(
      UserId.create('550e8400-e29b-41d4-a716-446655440001'),
    );
  });
});
