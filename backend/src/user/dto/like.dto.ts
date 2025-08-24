import { IsNotEmpty, IsNumber } from 'class-validator'

export class LikeDto {
  @IsNotEmpty()
  @IsNumber()
  likedById!: number

  @IsNotEmpty()
  @IsNumber()
  likedToId!: number
}
