import { Module } from '@nestjs/common';
import { IngresosInternoService } from './ingresos-interno.service';
import { IngresosInternoController } from './ingresos-interno.controller';
import { IngresoInterno } from './entities/ingresos-interno.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      IngresoInterno
    ])
  ],
  controllers: [IngresosInternoController],
  providers: [IngresosInternoService]
})
export class IngresosInternoModule {}
