import { Req,Res, Controller, Get, Post, Body, UsePipes, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response, Request } from "express";

import { ValidationPipe } from "src/pipes/validation.pipe";

import { UserLoginDto } from "src/dto/user-login.dto";
import { HttpAuthGuard } from "src/guards/http-auth.guard";
import { UsersService } from "src/users/users.service";

@UsePipes(ValidationPipe)
@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @UseGuards(HttpAuthGuard)
    @Get()
    async getCurrentUser(@Req() request: Request) {
        const { password, ...user } = await this.usersService.findById(request['user_id']);
        return user;
    }

    @Post()
    async login(@Res({ passthrough: true }) response: Response, @Body() userLoginDto: UserLoginDto) {
        const access_token = await this.authService.login(userLoginDto);

        return {
            success: true,
            message: 'Usuário conectado com sucesso.',
            access_token
        };
    }
}