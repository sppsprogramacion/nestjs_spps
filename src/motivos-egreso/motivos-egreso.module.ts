import { Module } from '@nestjs/common';
import { MotivosEgresoService } from './motivos-egreso.service';
import { MotivosEgresoController } from './motivos-egreso.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivoEgreso } from './entities/motivos-egreso.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      MotivoEgreso
    ])
  ],
  controllers: [MotivosEgresoController],
  providers: [MotivosEgresoService]
})
export class MotivosEgresoModule {}
