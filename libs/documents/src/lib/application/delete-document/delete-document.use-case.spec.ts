import { DeleteDocumentUseCase } from './delete-document.use-case';
import { DeleteDocumentCommand } from './delete-document.command';
import { mock, MockProxy } from 'jest-mock-extended';
import { DocumentReader } from '../../domain/ports/document-reader.port';
import { DocumentWriter } from '../../domain/ports/document-writer.port';
import { StorageDeleter } from '../../domain/ports/storage-deleter.port';
import { Document } from '../../domain/document.entity';
import { NotFoundException } from '@amt-assistant/exceptions';
import { DocumentStatus } from '@amt-assistant/contracts';
import { DocumentId } from '@amt-assistant/domain';

describe('DeleteDocumentUseCase', () => {
  let useCase: DeleteDocumentUseCase;
  let mockReader: MockProxy<DocumentReader>;
  let mockWriter: MockProxy<DocumentWriter>;
  let mockStorageDeleter: MockProxy<StorageDeleter>;

  const userId = '550e8400-e29b-41d4-a716-446655440001';
  const otherUserId = '550e8400-e29b-41d4-a716-446655440099';
  const documentId = '550e8400-e29b-41d4-a716-446655440000';

  const mockDocument = Document.restore({
    id: documentId,
    userId,
    originalName: 'test.pdf',
    filename: 'test-uuid.pdf',
    path: 'uploads/test-uuid.pdf',
    mimeType: 'application/pdf',
    size: 2048,
    status: DocumentStatus.UPLOADED,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(() => {
    mockReader = mock<DocumentReader>();
    mockWriter = mock<DocumentWriter>();
    mockStorageDeleter = mock<StorageDeleter>();

    useCase = new DeleteDocumentUseCase(
      mockReader,
      mockWriter,
      mockStorageDeleter,
    );
  });

  it('should delete file from storage and remove record from database when user is owner', async () => {
    mockReader.findById.mockResolvedValue(mockDocument);
    mockStorageDeleter.deleteFile.mockResolvedValue(undefined);
    mockWriter.delete.mockResolvedValue(undefined);

    const command = new DeleteDocumentCommand(documentId, userId);
    await useCase.execute(command);

    expect(mockReader.findById).toHaveBeenCalledWith(DocumentId.create(documentId));
    expect(mockStorageDeleter.deleteFile).toHaveBeenCalledWith('uploads/test-uuid.pdf');
    expect(mockWriter.delete).toHaveBeenCalledWith(DocumentId.create(documentId));
  });

  it('should throw NotFoundException if document does not exist', async () => {
    mockReader.findById.mockResolvedValue(null);

    const command = new DeleteDocumentCommand(documentId, userId);

    await expect(useCase.execute(command)).rejects.toThrow(
      new NotFoundException(`Document with ID ${documentId} not found`),
    );

    expect(mockStorageDeleter.deleteFile).not.toHaveBeenCalled();
    expect(mockWriter.delete).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException if document belongs to a different user', async () => {
    mockReader.findById.mockResolvedValue(mockDocument);

    const command = new DeleteDocumentCommand(documentId, otherUserId);

    await expect(useCase.execute(command)).rejects.toThrow(
      new NotFoundException(`Document with ID ${documentId} not found`),
    );

    expect(mockStorageDeleter.deleteFile).not.toHaveBeenCalled();
    expect(mockWriter.delete).not.toHaveBeenCalled();
  });
});
