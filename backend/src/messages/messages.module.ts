import { Module } from "@nestjs/common";

import { MessagesGateway } from "./messages.gateway";

import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from 'src/auth/auth.module';

import { messageProviders } from "./message.providers";
import { MessagesService } from "./messages.service";
import { UsersModule } from "src/users/users.module";


@Module({
    imports: [DatabaseModule, AuthModule, UsersModule],
    providers: [
        ...messageProviders,
        MessagesGateway,
        MessagesService
    ]
})
export class MessagesModule {}