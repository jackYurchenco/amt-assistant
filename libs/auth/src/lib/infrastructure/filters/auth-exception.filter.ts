import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { InvalidCredentialsException } from '../../application/exceptions/invalid-credentials.exception';
import { InvalidTokenException } from '../../application/exceptions/invalid-token.exception';
import { DomainException, InfrastructureException, ApplicationException } from '@amt-assistant/exceptions';

@Catch(ApplicationException, DomainException, InfrastructureException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof InvalidCredentialsException || exception instanceof InvalidTokenException) {
      status = HttpStatus.UNAUTHORIZED;
    } else if (exception instanceof DomainException) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof InfrastructureException) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof ApplicationException) {
      status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      type: exception.name,
    });
  }
}
