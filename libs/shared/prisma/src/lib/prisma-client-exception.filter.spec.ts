import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import { Response } from 'express';

describe('PrismaClientExceptionFilter', () => {
  let filter: PrismaClientExceptionFilter;
  let mockHttpAdapterHost: HttpAdapterHost;

  beforeEach(() => {
    mockHttpAdapterHost = {
      httpAdapter: {
        reply: jest.fn(),
      },
    } as unknown as HttpAdapterHost;

    filter = new PrismaClientExceptionFilter(mockHttpAdapterHost);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe('catch', () => {
    let mockArgumentsHost: ArgumentsHost;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockArgumentsHost = {
        switchToHttp: jest.fn().mockReturnValue({
          getResponse: jest.fn().mockReturnValue(mockResponse),
        }),
      } as unknown as ArgumentsHost;
    });

    it('should handle P2002 Unique constraint failed error', () => {
      const exception = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        {
          code: 'P2002',
          clientVersion: 'x.x.x',
        },
      );

      filter.catch(exception, mockArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.CONFLICT,
        message: 'A record with this data already exists.',
      });
    });

    it('should call super.catch for other Prisma errors', () => {
      const exception = new Prisma.PrismaClientKnownRequestError(
        'Some other error',
        {
          code: 'P2000',
          clientVersion: 'x.x.x',
        },
      );

      const superCatchSpy = jest
        .spyOn(Object.getPrototypeOf(PrismaClientExceptionFilter.prototype), 'catch')
        .mockImplementation(() => { /* empty */ });

      filter.catch(exception, mockArgumentsHost);

      expect(superCatchSpy).toHaveBeenCalledWith(exception, mockArgumentsHost);

      superCatchSpy.mockRestore();
    });
  });
});
