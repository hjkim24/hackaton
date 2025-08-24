import { PrismaService } from '@libs/prisma'
import { Injectable } from '@nestjs/common'
import { LikeDto } from './dto/like.dto'
import { PreferencesDto } from './dto/preference.dto'
import { SpareTimesDto } from './dto/spare-time.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // SpareTime 관련 API
  async createSpareTime(userId: number, dto: SpareTimesDto) {
    const createPromises = dto.spareTimes.map((timeDto) =>
      this.prisma.spareTime.create({
        data: {
          spareTime: timeDto.spareTime,
          day: timeDto.day,
          userId: userId
        }
      })
    )

    // 모든 생성 요청 실행
    await Promise.all(createPromises)

    // 사용자의 모든 여유 시간 반환
    return this.prisma.spareTime.findMany({
      where: { userId }
    })
  }

  async updateSpareTime(userId: number, dto: SpareTimesDto) {
    // 기존 SpareTime 삭제
    await this.prisma.spareTime.deleteMany({ where: { userId } })

    const createPromises = dto.spareTimes.map((timeDto) =>
      this.prisma.spareTime.create({
        data: {
          spareTime: timeDto.spareTime,
          day: timeDto.day,
          userId: userId
        }
      })
    )

    // 모든 생성 요청 실행
    await Promise.all(createPromises)

    // 사용자의 모든 여유 시간 반환
    return this.prisma.spareTime.findMany({
      where: { userId }
    })
  }

  // Preference 관련 API
  async createPreference(userId: number, dto: PreferencesDto) {
    const createPromises = dto.preferences.map((prefDto) =>
      this.prisma.preference.create({
        data: {
          preference: prefDto.preference,
          userId: userId
        }
      })
    )

    // 모든 생성 요청 실행
    await Promise.all(createPromises)

    // 사용자의 모든 선호도 반환
    return this.prisma.preference.findMany({
      where: { userId }
    })
  }

  async updatePreference(userId: number, dto: PreferencesDto) {
    // 기존 Preference 삭제
    await this.prisma.preference.deleteMany({ where: { userId } })

    const createPromises = dto.preferences.map((prefDto) =>
      this.prisma.preference.create({
        data: {
          preference: prefDto.preference,
          userId: userId
        }
      })
    )

    // 모든 생성 요청 실행
    await Promise.all(createPromises)

    // 사용자의 모든 선호도 반환
    return this.prisma.preference.findMany({
      where: { userId }
    })
  }

  async pushLike(dto: LikeDto) {
    const isExist = await this.prisma.like.findFirst({
      where: {
        likedByUserId: dto.likedById,
        likedToUserId: dto.likedToId
      }
    })

    if (isExist) {
      return isExist
    }

    return this.prisma.like.create({
      data: {
        likedByUserId: dto.likedById,
        likedToUserId: dto.likedToId
      }
    })
  }

  async getSexyPeople(userId: number) {
    const sexyPeople = await this.prisma.like.findMany({
      where: {
        likedByUserId: userId
      },
      select: {
        likedToUser: {
          select: {
            id: true,
            nickname: true,
            gender: true,
            college: true,
            major: true,
            age: true,
            admissionYear: true,
            Preference: true,
            SpareTime: true
          }
        }
      }
    })

    return sexyPeople
  }
}
