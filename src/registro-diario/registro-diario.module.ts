import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroDiarioService } from './registro-diario.service';
import { RegistroDiarioController } from './registro-diario.controller';
import { AuthModule } from 'src/auth/auth.module';
import { RegistroDiario } from './entities/registro-diario.entity';
import { SectorDestino } from 'src/sectores_destino/entities/sectores_destino.entity';
import { SectoresDestinoService } from 'src/sectores_destino/sectores_destino.service';
import { OrganismosDestinoService } from 'src/organismos_destino/organismos_destino.service';
import { OrganismoDestino } from 'src/organismos_destino/entities/organismos_destino.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      RegistroDiario, 
      OrganismoDestino,
      SectorDestino
    ])
  ],
  controllers: [RegistroDiarioController],
  providers: [RegistroDiarioService, SectoresDestinoService, OrganismosDestinoService]
})
export class RegistroDiarioModule {}
