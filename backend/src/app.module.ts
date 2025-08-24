import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ChatGateway } from './chat/chat.gateway'
import { ChatModule } from './chat/chat.module'
import { ChatService } from './chat/chat.service'
import { RecommendModule } from './recommend/recommend.module'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
      isGlobal: true
    }),
    UserModule,
    ChatModule,
    RecommendModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ChatService, UserService]
})
export class AppModule {}
