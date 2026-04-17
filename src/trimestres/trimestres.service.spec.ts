import { Test, TestingModule } from '@nestjs/testing';
import { TrimestresService } from './trimestres.service';

describe('TrimestresService', () => {
  let service: TrimestresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrimestresService],
    }).compile();

    service = module.get<TrimestresService>(TrimestresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
