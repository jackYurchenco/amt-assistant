export abstract class StorageReader {
  abstract getFile(path: string): Promise<Buffer>;
}
