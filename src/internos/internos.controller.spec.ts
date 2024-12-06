import { Test, TestingModule } from '@nestjs/testing';
import { InternosController } from './internos.controller';
import { InternosService } from './internos.service';

describe('InternosController', () => {
  let controller: InternosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternosController],
      providers: [InternosService],
    }).compile();

    controller = module.get<InternosController>(InternosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
