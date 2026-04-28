import { Transform, TransformFnParams } from 'class-transformer';

export function Trim(): PropertyDecorator {
  return Transform(({ value }: TransformFnParams) => {
    return typeof value === 'string' ? value.trim() : value;
  });
}
