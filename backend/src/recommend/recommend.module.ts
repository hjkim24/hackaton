import { PrismaService } from '@libs/prisma/index'
import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client/extension'
import { RecommendController } from './recommend.controller'
import { RecommendService } from './recommend.service'

@Module({
  imports: [PrismaClient, PrismaService],
  controllers: [RecommendController],
  providers: [RecommendService]
})
export class RecommendModule {}
