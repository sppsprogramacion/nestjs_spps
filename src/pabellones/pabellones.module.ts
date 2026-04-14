import { Module } from '@nestjs/common';
import { PabellonesService } from './pabellones.service';
import { PabellonesController } from './pabellones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pabellon } from './entities/pabellone.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pabellon
    ])
  ],
  controllers: [PabellonesController],
  providers: [PabellonesService]
})
export class PabellonesModule {}
