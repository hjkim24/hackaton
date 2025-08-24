import { IsNotEmpty, IsString } from 'class-validator'

export class FilterSpareTimeDto {
  @IsString()
  @IsNotEmpty()
  day: string

  @IsString()
  @IsNotEmpty()
  startTime: string

  @IsString()
  @IsNotEmpty()
  endTime: string
}
