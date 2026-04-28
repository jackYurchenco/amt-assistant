import { Transform, TransformFnParams } from 'class-transformer';

export function ToLowerCase(): PropertyDecorator {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }
    return value;
  });
}
