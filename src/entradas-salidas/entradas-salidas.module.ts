import { Module } from '@nestjs/common';
import { EntradasSalidasService } from './entradas-salidas.service';
import { EntradasSalidasController } from './entradas-salidas.controller';

@Module({
  controllers: [EntradasSalidasController],
  providers: [EntradasSalidasService]
})
export class EntradasSalidasModule {}
