import { Module } from '@nestjs/common';
import { SectoresDestinoService } from './sectores_destino.service';
import { SectoresDestinoController } from './sectores_destino.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorDestino } from './entities/sectores_destino.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      SectorDestino
    ])
  ],
  controllers: [SectoresDestinoController],
  providers: [SectoresDestinoService]
})
export class SectoresDestinoModule {}
