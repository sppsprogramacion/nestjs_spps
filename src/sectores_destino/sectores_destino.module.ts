import { Module } from '@nestjs/common';
import { SectoresDestinoService } from './sectores_destino.service';
import { SectoresDestinoController } from './sectores_destino.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorDestino } from './entities/sectores_destino.entity';
import { OrganismosDestinoService } from 'src/organismos_destino/organismos_destino.service';
import { OrganismoDestino } from 'src/organismos_destino/entities/organismos_destino.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([        
      SectorDestino,
      OrganismoDestino
    ])
  ],
  controllers: [SectoresDestinoController],
  providers: [SectoresDestinoService, OrganismosDestinoService]
})
export class SectoresDestinoModule {}
