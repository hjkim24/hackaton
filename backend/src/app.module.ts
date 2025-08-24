import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ChatGateway } from './chat/chat.gateway'
import { ChatService } from './chat/chat.service'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
      isGlobal: true
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ChatService, UserService]
})
export class AppModule {}
