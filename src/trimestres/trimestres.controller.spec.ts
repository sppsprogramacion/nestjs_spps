import { Test, TestingModule } from '@nestjs/testing';
import { TrimestresController } from './trimestres.controller';
import { TrimestresService } from './trimestres.service';

describe('TrimestresController', () => {
  let controller: TrimestresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrimestresController],
      providers: [TrimestresService],
    }).compile();

    controller = module.get<TrimestresController>(TrimestresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
