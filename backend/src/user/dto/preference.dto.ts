/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsArray } from 'class-validator'

export class CreatePreferenceDto {
  @IsNotEmpty()
  @IsString()
  preference: string
}

export class UpdatePreferenceDto extends CreatePreferenceDto {}

export class PreferencesDto {
  @IsArray()
  preferences: CreatePreferenceDto[]
}
