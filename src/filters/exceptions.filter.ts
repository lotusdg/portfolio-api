import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();

      switch (statusCode) {
        case HttpStatus.BAD_REQUEST:
          const message = exception.getResponse();

          const errorResponse = {
            statusCode,
            message: Array.isArray(message) ? message[0] : message,
            error: 'Custom Bad Request',
          };

          return host
            .switchToHttp()
            .getResponse()
            .status(statusCode)
            .json(errorResponse);

        case HttpStatus.UNAUTHORIZED:
          const errorMessage = 'Unauthorized';

          const unauthorizedResponse = {
            statusCode,
            message: errorMessage,
            error: 'Custom Unauthorized',
          };

          return host
            .switchToHttp()
            .getResponse()
            .status(statusCode)
            .json(unauthorizedResponse);

        case HttpStatus.FORBIDDEN:
          const forbiddenMessage = 'Access Forbidden';

          const forbiddenResponse = {
            statusCode,
            message: forbiddenMessage,
            error: 'Custom Forbidden',
          };

          return host
            .switchToHttp()
            .getResponse()
            .status(statusCode)
            .json(forbiddenResponse);

        case HttpStatus.NOT_FOUND:
          const notFoundMessage = 'Resource not found';

          const notFoundResponse = {
            statusCode,
            message: notFoundMessage,
            error: 'Custom Not Found',
          };

          return host
            .switchToHttp()
            .getResponse()
            .status(statusCode)
            .json(notFoundResponse);
      }
    }

    super.catch(exception, host);
  }
}
