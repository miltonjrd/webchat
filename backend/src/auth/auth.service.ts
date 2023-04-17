import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

import { UsersService } from "src/users/users.service";
import { UserLoginDto } from "src/dto/user-login.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) {}

    async currentUser(token: string) {
        const payload = this.jwtService.decode(token) as { [key: string]: any };
        const { password, ...user } = await this.usersService.findById(payload.sub);
        return user;
    }

    async login({ identificator, password }: UserLoginDto): Promise<string> {
        let user = await this.usersService.findByName(identificator);

        if (!user) {
            user = await this.usersService.findByEmail(identificator);

            if (!user) {
                throw new NotFoundException('Usuário não encontrado');
            }
        }
        
        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id };
        const token = await this.jwtService.signAsync(payload);
        return token;
    }
}