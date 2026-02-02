import { forwardRef, Module } from '@nestjs/common';
import { TrasladosInternoService } from './traslados-interno.service';
import { TrasladosInternoController } from './traslados-interno.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrasladoInterno } from './entities/traslados-interno.entity';
import { IngresoInterno } from 'src/ingresos-interno/entities/ingresos-interno.entity';
import { IngresosInternoService } from 'src/ingresos-interno/ingresos-interno.service';
import { IngresosInternoModule } from 'src/ingresos-interno/ingresos-interno.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => IngresosInternoModule),
    TypeOrmModule.forFeature([
      TrasladoInterno,
      IngresoInterno
    ])
  ],
  controllers: [TrasladosInternoController],
  providers: [TrasladosInternoService],
  exports: [TrasladosInternoService]
})
export class TrasladosInternoModule {}
