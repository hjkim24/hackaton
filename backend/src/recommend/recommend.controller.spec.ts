import { Test, TestingModule } from '@nestjs/testing';
import { RecommendController } from './recommend.controller';
import { RecommendService } from './recommend.service';

describe('RecommendController', () => {
  let controller: RecommendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendController],
      providers: [RecommendService],
    }).compile();

    controller = module.get<RecommendController>(RecommendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
