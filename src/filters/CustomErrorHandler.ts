import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

@Catch()
export class CustomErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const { message: errMsg, stack: errStack, name: errName } = exception;
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();
    res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    // HttpException Error
    if (exception instanceof HttpException) {
      res.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    // checking if error is jwt error
    if (exception instanceof JsonWebTokenError) {
      res.json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Your session has expired ! Please login again',
        errorName: 'Session Expired'
      });
      return;
    }
    // logging to console
    console.error({ message: errMsg, stack: errStack, name: errName });

    // other error to rewirte InternalServerErrorException response
    res.json({
      statusCode: res.statusCode,
      message: errMsg,
      errorName: errName
    });
  }
}
