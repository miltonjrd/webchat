import { IsString } from 'class-validator';

export class UserLoginDto {
    @IsString()
    identificator: string;

    @IsString()
    password: string;
}