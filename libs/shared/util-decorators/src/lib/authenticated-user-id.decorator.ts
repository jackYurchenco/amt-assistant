import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // TODO: Extract actual user ID from ctx.switchToHttp().getRequest().user when Auth is implemented
    return 'e6a7d2c9-d5a6-4b8c-9b5e-3a2b1c0d9e8f';
  },
);
