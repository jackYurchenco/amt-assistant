export abstract class StorageDeleter {
  abstract deleteFile(path: string): Promise<void>;
}
