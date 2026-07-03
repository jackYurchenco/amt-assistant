import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { SessionNotFoundException } from '../../application/exceptions/session-not-found.exception';
import { SessionForbiddenException } from '../../application/exceptions/session-forbidden.exception';
import { ApplicationException, DomainException, InfrastructureException } from '@amt-assistant/exceptions';

@Catch(ApplicationException, DomainException, InfrastructureException)
export class SessionsExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof SessionNotFoundException) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof SessionForbiddenException) {
      status = HttpStatus.FORBIDDEN;
    } else if (exception instanceof DomainException) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof ApplicationException) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof InfrastructureException) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      type: exception.name,
    });
  }
}
