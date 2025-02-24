import { Module } from '@nestjs/common';
import { MotivosAtencionService } from './motivos_atencion.service';
import { MotivosAtencionController } from './motivos_atencion.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivoAtencion } from './entities/motivos_atencion.entity';
import { OrganismosDestinoService } from 'src/organismos_destino/organismos_destino.service';
import { OrganismoDestino } from 'src/organismos_destino/entities/organismos_destino.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      MotivoAtencion,
      OrganismoDestino
    ])
  ],
  controllers: [MotivosAtencionController],
  providers: [MotivosAtencionService, OrganismosDestinoService]
})
export class MotivosAtencionModule {}
