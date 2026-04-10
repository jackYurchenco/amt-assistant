export abstract class HasherService {
  abstract hash(plainText: string): Promise<string>;
  abstract compare(plainText: string, hashedText: string): Promise<boolean>;
}
