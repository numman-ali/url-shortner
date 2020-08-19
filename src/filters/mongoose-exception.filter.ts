import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'mongoose';
const { DocumentNotFoundError } = Error;

@Catch(Error)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = 500;

    if (exception instanceof DocumentNotFoundError) status = 404;

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message
      });
  }
}
