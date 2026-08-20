import { Module } from '@nestjs/common';
import { ListasGeneralesTablasService } from './listas-generales-tablas.service';
import { ListasGeneralesTablasController } from './listas-generales-tablas.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    
  ],
  controllers: [ListasGeneralesTablasController],
  providers: [ListasGeneralesTablasService]
})
export class ListasGeneralesTablasModule {}
