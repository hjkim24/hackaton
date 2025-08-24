import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  ValidationPipe
} from '@nestjs/common'
import { FilterSpareTimeDto } from './dto/filter-spare-time.dto'
import { RecommendService } from './recommend.service'

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}
  @Get()
  async getRecommendations(
    @Query('userId', ParseIntPipe) userId: number,
    @Query(new ValidationPipe({ transform: true })) filter: FilterSpareTimeDto
  ) {
    await this.recommendService.getRecommnedations(userId, filter)
  }
}
