/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Days } from '@prisma/client'
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator'

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
