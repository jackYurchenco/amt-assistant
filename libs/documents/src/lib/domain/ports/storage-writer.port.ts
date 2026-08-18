export abstract class StorageWriter {
  abstract saveFile(filename: string, buffer: Buffer): Promise<string>;
}
