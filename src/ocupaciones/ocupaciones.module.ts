import { Module } from '@nestjs/common';
import { OcupacionesService } from './ocupaciones.service';
import { OcupacionesController } from './ocupaciones.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ocupacion } from './entities/ocupacione.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Ocupacion
    ])
  ],
  controllers: [OcupacionesController],
  providers: [OcupacionesService]
})
export class OcupacionesModule {}
