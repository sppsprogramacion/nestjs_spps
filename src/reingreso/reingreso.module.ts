import { Module } from '@nestjs/common';
import { ReingresoService } from './reingreso.service';
import { ReingresoController } from './reingreso.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reingreso } from './entities/reingreso.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Reingreso
    ])
  ],
  controllers: [ReingresoController],
  providers: [ReingresoService]
})
export class ReingresoModule {}
