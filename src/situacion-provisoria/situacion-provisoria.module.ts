import { Module } from '@nestjs/common';
import { SituacionProvisoriaService } from './situacion-provisoria.service';
import { SituacionProvisoriaController } from './situacion-provisoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SituacionProvisoria } from './entities/situacion-provisoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SituacionProvisoria
    ])
  ],
  controllers: [SituacionProvisoriaController],
  providers: [SituacionProvisoriaService]
})
export class SituacionProvisoriaModule {}
