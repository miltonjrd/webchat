import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class SocketAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToWs();
        const socket = ctx.getClient<Socket>();

        const token = socket.handshake.auth.token;
        if (!await this.jwtService.verifyAsync(token))
            throw new UnauthorizedException();

        const payload = this.jwtService.decode(token) as { [key: string]: any };
        socket.data = {
            user_id: payload.sub
        };
        
        return true;
    }
}