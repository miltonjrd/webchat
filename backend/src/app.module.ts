import { Module } from '@nestjs/common';

import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MessagesModule, 
    UsersModule, 
    AuthModule
  ],
  providers: [],
})
export class AppModule {}
