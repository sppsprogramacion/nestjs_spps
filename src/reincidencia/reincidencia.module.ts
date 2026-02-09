import { Module } from '@nestjs/common';
import { ReincidenciaService } from './reincidencia.service';
import { ReincidenciaController } from './reincidencia.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reincidencia } from './entities/reincidencia.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Reincidencia
    ])
  ],
  controllers: [ReincidenciaController],
  providers: [ReincidenciaService]
})
export class ReincidenciaModule {}
