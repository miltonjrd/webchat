import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || this.isNative(metatype))
            return value;

        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length) {
            throw new BadRequestException();
        }

        return value;
    }

    private isNative(metatype: Function) {
        const types: Function[] = [String, Boolean, Array, Object, Number];

        return types.includes(metatype);
    }
}