import { Injectable } from '@nestjs/common'
import { PrismaService } from '../libs/prisma/src'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
}
