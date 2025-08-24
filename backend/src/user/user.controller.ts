import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { IDValidationPipe } from 'libs/pipe/src/id-validation.pipe'
import { LikeDto } from './dto/like.dto'
import { PreferencesDto } from './dto/preference.dto'
import { SpareTimesDto } from './dto/spare-time.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':userId/spare-time')
  async createSpareTime(
    @Param('userId', IDValidationPipe) userId: number,
    @Body() spareTimeDto: SpareTimesDto
  ) {
    return await this.userService.createSpareTime(userId, spareTimeDto)
  }

  @Put(':userId/spare-time')
  async updateSpareTime(
    @Param('userId', IDValidationPipe) userId: number,
    @Body() spareTimeDto: SpareTimesDto
  ) {
    return await this.userService.updateSpareTime(userId, spareTimeDto)
  }

  @Post(':userId/preference')
  async createPreference(
    @Param('userId', IDValidationPipe) userId: number,
    @Body() preferenceDto: PreferencesDto
  ) {
    return await this.userService.createPreference(userId, preferenceDto)
  }

  @Put(':userId/preference')
  async updatePreference(
    @Param('userId', IDValidationPipe) userId: number,
    @Body() preferenceDto: PreferencesDto
  ) {
    return await this.userService.updatePreference(userId, preferenceDto)
  }

  @Post('/like')
  async pushLike(@Body() likeDto: LikeDto) {
    return await this.userService.pushLike(likeDto)
  }

  @Get(':userId/like-list')
  async getSexyPeople(@Param('userId', IDValidationPipe) userId: number) {
    return await this.userService.getSexyPeople(userId)
  }
}
