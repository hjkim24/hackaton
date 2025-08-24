import { Injectable } from '@nestjs/common'
import { Days } from '@prisma/client'
import { PrismaService } from '../../libs/prisma/src'
import { FilterSpareTimeDto } from './dto/filter-spare-time.dto'

@Injectable()
export class RecommendService {
  constructor(private readonly prisma: PrismaService) {}

  constructTimeFilters(filter: FilterSpareTimeDto): string[] {
    const timeSlots: string[] = []

    // 시작 시간과 종료 시간을 분 단위로 변환
    const startTimeInMinutes = this.timeToMinutes(filter.startTime)
    const endTimeInMinutes = this.timeToMinutes(filter.endTime)

    // 30분 단위로 시간 슬롯 생성
    for (
      let minutes = startTimeInMinutes;
      minutes <= endTimeInMinutes;
      minutes += 30
    ) {
      timeSlots.push(this.minutesToTime(minutes))
    }

    return timeSlots
  }

  private timeToMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours * 60 + minutes
  }

  private minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    // HH:MM 형식으로 포맷팅 (두 자리로 맞춤)
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  private stringToDaysEnum(dayString: string): Days | null {
    // Object.values(Days)로 유효한 Days 값들을 확인
    const validDays = Object.values(Days)

    if (validDays.includes(dayString as Days)) {
      return dayString as Days
    }

    return null
  }

  async getRecommnedations(userId: number, spareTime: FilterSpareTimeDto) {
    const filteredTimes = this.constructTimeFilters(spareTime)
    const dayEnum = this.stringToDaysEnum(spareTime.day)

    const targetPref = await this.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        Preference: {
          select: {
            preference: true
          }
        }
      }
    })

    const others = await this.prisma.spareTime.findMany({
      where: {
        spareTime: {
          in: filteredTimes
        },
        day: dayEnum!,
        userId: {
          not: userId
        }
      },
      select: {
        user: {
          select: {
            Preference: {
              select: {
                preference: true
              }
            },
            id: true,
            nickname: true,
            age: true
          }
        }
      }
    })

    const filteredUsers = others.filter((other) => {
      if (!other.user || !targetPref) return false

      const targetPreferences = targetPref.Preference.map((p) => p.preference)
      const otherPreferences = other.user.Preference.map((p) => p.preference)

      // 겹치는 preference가 하나라도 있는지 확인
      return targetPreferences.some((targetPref) =>
        otherPreferences.includes(targetPref)
      )
    })

    // 동일 사용자 중복 제거 (user.id 기준)
    const seen = new Set<number>()
    const deduped = filteredUsers.filter((item) => {
      const id = item.user?.id
      if (id == null) return false
      if (seen.has(id)) return false
      seen.add(id)
      return true
    })

    return deduped
  }

  async getRecommendationByKeyword(userId: number, keyword: string) {
    const users = await this.prisma.user.findMany({
      where: {
        id: { not: userId },
        Preference: {
          some: {
            preference: keyword
          }
        }
      },
      select: {
        id: true,
        nickname: true,
        age: true,
        Preference: {
          select: { preference: true }
        }
      }
    })

    return users
  }
}
