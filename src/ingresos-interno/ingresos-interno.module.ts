import { forwardRef, Module } from '@nestjs/common';
import { IngresosInternoService } from './ingresos-interno.service';
import { IngresosInternoController } from './ingresos-interno.controller';
import { IngresoInterno } from './entities/ingresos-interno.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrasladoInterno } from 'src/traslados-interno/entities/traslados-interno.entity';
import { TrasladosInternoModule } from 'src/traslados-interno/traslados-interno.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => TrasladosInternoModule),
    TypeOrmModule.forFeature([
      IngresoInterno,
      TrasladoInterno
    ])
  ],
  controllers: [IngresosInternoController],
  providers: [IngresosInternoService],
  exports: [IngresosInternoService]
})
export class IngresosInternoModule {}
