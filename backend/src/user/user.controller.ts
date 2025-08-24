import { Body, Controller, Post, Put, Query } from '@nestjs/common'
import { IDValidationPipe } from 'libs/pipe/src/id-validation.pipe'
import { PreferencesDto } from './dto/preference.dto'
import { SpareTimesDto } from './dto/spare-time.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createSpareTime(
    @Query('userId', IDValidationPipe) userId: number,
    @Body() spareTimeDto: SpareTimesDto
  ) {
    return await this.userService.createSpareTime(userId, spareTimeDto)
  }

  @Put()
  async updateSpareTime(
    @Query('userId', IDValidationPipe) userId: number,
    @Body() spareTimeDto: SpareTimesDto
  ) {
    return await this.userService.updateSpareTime(userId, spareTimeDto)
  }

  @Post()
  async createPreference(
    @Query('userId', IDValidationPipe) userId: number,
    @Body() preferenceDto: PreferencesDto
  ) {
    return await this.userService.createPreference(userId, preferenceDto)
  }

  @Put()
  async updatePreference(
    @Query('userId', IDValidationPipe) userId: number,
    @Body() preferenceDto: PreferencesDto
  ) {
    return await this.userService.updatePreference(userId, preferenceDto)
  }

  @Post()
  async pushLike(
    @Body('likedById', IDValidationPipe) likedById: number,
    @Body('likedToId', IDValidationPipe) likedToId: number
  ) {
    return await this.userService.pushLike(likedById, likedToId)
  }
}
