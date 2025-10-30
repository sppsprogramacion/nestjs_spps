import { Module } from '@nestjs/common';
import { ListasGeneralesTablasService } from './listas-generales-tablas.service';
import { ListasGeneralesTablasController } from './listas-generales-tablas.controller';

@Module({
  controllers: [ListasGeneralesTablasController],
  providers: [ListasGeneralesTablasService]
})
export class ListasGeneralesTablasModule {}
