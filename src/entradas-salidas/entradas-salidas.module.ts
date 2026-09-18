import { Module } from '@nestjs/common';
import { EntradasSalidasService } from './entradas-salidas.service';
import { EntradasSalidasController } from './entradas-salidas.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradasSalida } from './entities/entradas-salida.entity';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';
import { EntradaSalidaCorrelativo } from './entities/entradas-salida-correlativos.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      EntradasSalida,
      EntradaSalidaCorrelativo
    ])
  ],
  controllers: [EntradasSalidasController],
  providers: [EntradasSalidasService, DriveImagenesService]
})
export class EntradasSalidasModule {}
