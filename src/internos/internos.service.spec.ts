import { Test, TestingModule } from '@nestjs/testing';
import { InternosService } from './internos.service';

describe('InternosService', () => {
  let service: InternosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternosService],
    }).compile();

    service = module.get<InternosService>(InternosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
