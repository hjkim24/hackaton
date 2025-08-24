import { PrismaService } from '@libs/index'
import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'

@Module({
  imports: [PrismaService],
  providers: [ChatGateway, ChatService],
  exports: [ChatService]
})
export class ChatModule {}
