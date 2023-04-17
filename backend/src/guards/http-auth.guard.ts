import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";

@Injectable()
export class HttpAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        if (!request.headers.authorization)
            throw new UnauthorizedException();
            
        const [type, token] = request.headers.authorization.split(' ');

        if (type !== 'Bearer' && !await this.jwtService.verifyAsync(token))
            throw new UnauthorizedException();

        const payload = this.jwtService.decode(token) as { [key: string]: any };
        request['user_id'] = payload.sub;

        return true;
    }
}