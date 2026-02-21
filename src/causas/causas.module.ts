import { forwardRef, Module } from '@nestjs/common';
import { CausasService } from './causas.service';
import { CausasController } from './causas.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Causa } from './entities/causa.entity';
import { IngresosInternoModule } from 'src/ingresos-interno/ingresos-interno.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => IngresosInternoModule),
    TypeOrmModule.forFeature([
      Causa,
    ])
  ],
  controllers: [CausasController],
  providers: [CausasService]
})
export class CausasModule {}
