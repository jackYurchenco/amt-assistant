export abstract class BaseValueObject<T, Brand extends string> {
  readonly __brand!: Brand;

  protected readonly value: T;

  protected constructor(value: T) {
    this.value = (typeof value === 'object' && value !== null) ? Object.freeze({ ...value }) : value;
  }

  public getValue(): T {
    return this.value;
  }

  public equals(other: BaseValueObject<T, Brand> | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (other.constructor.name !== this.constructor.name) {
      return false;
    }

    if (typeof this.value === 'object') {
      return JSON.stringify(this.value) === JSON.stringify(other.value);
    }

    return this.value === other.value;
  }
}
