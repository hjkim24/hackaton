import { Injectable } from '@nestjs/common'
import { PrismaService } from '../libs/prisma/prisma.service'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
}
