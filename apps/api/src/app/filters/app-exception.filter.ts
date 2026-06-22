import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApplicationException,
  DomainException,
  InfrastructureException,
} from '@amt-assistant/exceptions';

@Catch(DomainException, ApplicationException, InfrastructureException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(
    exception: DomainException | ApplicationException | InfrastructureException,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof DomainException) {
      status = HttpStatus.BAD_REQUEST;
    }

    if (exception instanceof ApplicationException) {
      status = HttpStatus.BAD_REQUEST;
    }

    if (exception instanceof InfrastructureException) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      type: exception.name,
    });
  }
}
