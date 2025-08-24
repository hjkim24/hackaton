import { Injectable } from '@nestjs/common'
import { PrismaService } from 'libs'
import {}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async updateSpareTime(userId: number, dto: updateSpareTimeDto) {
    // 기존 여유 시간 삭제
    await this.prisma.spareTime.deleteMany({
      where: {
        userId: userId
      }
    })

    // 새로운 여유 시간 추가
    const createPromises = dto.spareTimes.map((time) =>
      this.prisma.spareTime.create({
        data: {
          spareTime: time,
          userId: userId
        }
      })
    )

    // 모든 생성 요청 실행
    await Promise.all(createPromises)

    // 사용자의 모든 여유 시간 반환
    return this.prisma.spareTime.findMany({
      where: {
        userId: userId
      }
    })
  }
}
