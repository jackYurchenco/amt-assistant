import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { StorageWriter } from '../domain/ports/storage-writer.port';
import { StorageOperationException } from '@amt-assistant/exceptions';

@Injectable()
export class LocalStorageService implements StorageWriter {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');
  private readonly logger = new Logger(LocalStorageService.name);

  constructor() {
    this.ensureUploadDir().catch((error) => {
      this.logger.error('Failed to initialize local storage:', error);
      process.exit(1);
    });
  }

  private async ensureUploadDir(): Promise<void> {
    try {
      await fs.access(this.uploadDir);
    } catch {
      try {
        await fs.mkdir(this.uploadDir, { recursive: true });
      } catch {
        throw new StorageOperationException('Failed to create upload directory');
      }
    }
  }

  async saveFile(filename: string, buffer: Buffer): Promise<string> {
    const filePath = path.join(this.uploadDir, filename);
    try {
      await fs.writeFile(filePath, buffer);
      return `uploads/${filename}`;
    } catch {
      throw new StorageOperationException('Failed to save file to local storage');
    }
  }
}
