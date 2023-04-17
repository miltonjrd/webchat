import { Module } from "@nestjs/common";

import { DatabaseModule } from '../database/database.module';

import { userProviders } from "./user.providers";

import { UsersGateway } from "./users.gateway";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [
        ...userProviders,
        UsersService,
        UsersGateway
    ],
    exports: [UsersService]
})
export class UsersModule {}