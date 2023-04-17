import { Controller, Get, Post, Body, Param, UsePipes, UseFilters } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

import { ValidationPipe } from '@nestjs/common/pipes';
import { TypeOrmExceptionFilter } from 'src/filters/type-orm-exception.filter';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@UsePipes(ValidationPipe)
@UseFilters(TypeOrmExceptionFilter, HttpExceptionFilter)
@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':name')
    async getByName(@Param('name') name: string) {
        const { password, ...user } = await this.usersService.findByName(name);

        return user;
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        await this.usersService.create(createUserDto);
        
        return {
            success: true,
            message: 'Usuário registrado com sucesso.'
        };
    }

}