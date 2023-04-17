import { ExceptionFilter, HttpException, ArgumentsHost, Catch } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(exception.getStatus())
        .json({
            success: false,
            message: exception.message
        });
    }
}