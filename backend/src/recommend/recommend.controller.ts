import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe
} from '@nestjs/common'
import { FilterSpareTimeDto } from './dto/filter-spare-time.dto'
import { RecommendService } from './recommend.service'

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}
  @Get('/:userId')
  async getRecommendations(
    @Param('userId', ParseIntPipe) userId: number,
    @Query(new ValidationPipe({ transform: true })) filter: FilterSpareTimeDto
  ) {
    return await this.recommendService.getRecommnedations(userId, filter)
  }

  @Get('/:userId/by-keyword')
  async getRecommendationsByKeyword(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('keyword') keyword: string
  ) {
    return await this.recommendService.getRecommendationByKeyword(
      userId,
      keyword
    )
  }
}
