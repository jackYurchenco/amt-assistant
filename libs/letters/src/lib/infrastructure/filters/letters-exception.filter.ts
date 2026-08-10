import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationException, DomainException, InfrastructureException, NotFoundException } from '@amt-assistant/exceptions';

@Catch(ApplicationException, DomainException, InfrastructureException)
export class LettersExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
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
