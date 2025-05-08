import { Module } from '@nestjs/common';
import { ExcepcionesIngresoVisitaService } from './excepciones-ingreso-visita.service';
import { ExcepcionesIngresoVisitaController } from './excepciones-ingreso-visita.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcepcionIngresoVisita } from './entities/excepciones-ingreso-visita.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ExcepcionIngresoVisita
    ])
  ],
  controllers: [ExcepcionesIngresoVisitaController],
  providers: [ExcepcionesIngresoVisitaService]
})
export class ExcepcionesIngresoVisitaModule {}
