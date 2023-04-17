import { ExceptionFilter, ArgumentsHost, HttpException, Catch } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, TypeORMError } from 'typeorm';

Catch(TypeORMError, EntityNotFoundError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(500)
        .json({
            success: false,
            message: exception.message
        });
    }
}