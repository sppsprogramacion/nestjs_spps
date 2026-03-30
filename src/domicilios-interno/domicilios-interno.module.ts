import { Module } from '@nestjs/common';
import { DomiciliosInternoService } from './domicilios-interno.service';
import { DomiciliosInternoController } from './domicilios-interno.controller';

@Module({
  controllers: [DomiciliosInternoController],
  providers: [DomiciliosInternoService]
})
export class DomiciliosInternoModule {}
