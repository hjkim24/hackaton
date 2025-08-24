/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNotEmpty, IsString, IsArray } from 'class-validator'

// Prisma enum 정의
export enum Days {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export class CreateSpareTimeDto {
  @IsNotEmpty()
  @IsString()
  spareTime: string

  @IsNotEmpty()
  @IsEnum(Days)
  day: Days
}

export class UpdateSpareTimeDto extends CreateSpareTimeDto {}

export class SpareTimesDto {
  @IsArray()
  spareTimes: CreateSpareTimeDto[]
}
