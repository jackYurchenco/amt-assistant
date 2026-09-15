import { Module } from '@nestjs/common';
import { PrismaModule } from '@amt-assistant/prisma';
import { DocumentsController } from './interface/documents.controller';
import { UploadDocumentUseCase } from './application/upload-document/upload-document.use-case';
import { GetDocumentByIdUseCase } from './application/get-document-by-id/get-document-by-id.use-case';
import { PrismaDocumentRepository } from './infrastructure/prisma-document.repository';
import { LocalStorageService } from './infrastructure/local-storage.service';
import { DocumentWriter } from './domain/ports/document-writer.port';
import { DocumentReader } from './domain/ports/document-reader.port';
import { StorageWriter } from './domain/ports/storage-writer.port';

@Module({
  imports: [PrismaModule],
  controllers: [DocumentsController],
  providers: [
    UploadDocumentUseCase,
    GetDocumentByIdUseCase,
    {
      provide: DocumentWriter,
      useClass: PrismaDocumentRepository,
    },
    {
      provide: DocumentReader,
      useClass: PrismaDocumentRepository,
    },
    {
      provide: StorageWriter,
      useClass: LocalStorageService,
    },
  ],
  exports: [UploadDocumentUseCase, GetDocumentByIdUseCase],
})
export class DocumentsModule {}
