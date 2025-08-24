/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Days } from '../../../generated/prisma'

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
