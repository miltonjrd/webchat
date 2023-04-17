import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        UsersModule, 
        JwtModule.registerAsync({
            useFactory() {
                return {
                    global: true,
                    secret: process.env.JWT_SECRET,
                    signOptions: {
                        expiresIn: '3600s'
                    }
                }
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [JwtModule]
})
export class AuthModule {}