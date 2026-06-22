import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { InvalidCredentialsException } from '../../application/exceptions/invalid-credentials.exception';

@Catch(InvalidCredentialsException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidCredentialsException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: exception.message,
      type: exception.name,
    });
  }
}
