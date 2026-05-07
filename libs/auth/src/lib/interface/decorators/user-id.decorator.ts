
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    // const request = ctx.switchToHttp().getRequest();
    // TODO: Replace with actual user ID from request (e.g., request.user.id)
    return 'e6a7d2c9-d5a6-4b8c-9b5e-3a2b1c0d9e8f';
  },
);
