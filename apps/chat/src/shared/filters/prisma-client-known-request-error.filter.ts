import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';
import { Logger } from 'nestjs-pino';
import { PrismaError } from 'prisma-error-enum';

/**
 * Catch PrismaClientKnownRequestError and transform it into a more
 * user-friendly error response.
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
 * @see https://docs.nestjs.com/exception-filters
 */
@Catch(PrismaClientKnownRequestError)
export class PrismaCLientKnownRequestErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    let statusCode: number;
    let errorCode: string;
    let message: string;
    let field = '';

    switch (exception.code) {
      case PrismaError.RecordsNotFound:
        statusCode = 404;
        errorCode = exception.code;
        message = 'The requested resource does not exist';
        break;

      case PrismaError.UniqueConstraintViolation:
        statusCode = 400;
        errorCode = exception.code;
        message = 'The value for the field is already taken';

        const fields = exception.meta?.target as string[];
        if (fields.length === 0) {
          field = '';
        } else {
          field = fields[0];
        }
        break;

      case PrismaError.ForeignConstraintViolation:
        statusCode = 400;
        errorCode = exception.code;
        message = 'The provided resource does not exist';
        break;

      default:
        statusCode = 500;
        errorCode = 'InternalServerError';
        message = 'Unknown error';

        this.logger.error(exception, exception.stack);
    }

    if (statusCode !== 500) {
      this.logger.debug(exception, exception.stack);
    }

    const response = ctx.getResponse<Response>();

    response.status(statusCode).json({
      statusCode,
      errorCode,
      message,
      field: field ?? undefined,
    });
  }
}
