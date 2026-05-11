import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const AuthenticatedUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    const userId = request.user?.id || request.user?.sub;

    if (!userId) {
      throw new UnauthorizedException('User is not authenticated or token is invalid');
    }

    return userId;
  },
);
