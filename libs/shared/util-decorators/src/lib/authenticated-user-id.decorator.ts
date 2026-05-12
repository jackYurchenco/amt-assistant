import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export interface JwtPayload {
  id: string;
  email?: string;
  role?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const AuthenticatedUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    const userId = request.user?.id || request.user?.id;

    if (!userId) {
      throw new UnauthorizedException('User is not authenticated or token is invalid');
    }

    return userId;
  },
);
