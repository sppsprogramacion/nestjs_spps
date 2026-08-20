import { Module } from '@nestjs/common';
import { HuellasCambiosService } from './huellas-cambios.service';
import { HuellasCambiosController } from './huellas-cambios.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HuellaCambio } from './entities/huellas-cambio.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      HuellaCambio
    ])
  ],
  controllers: [HuellasCambiosController],
  providers: [HuellasCambiosService]
})
export class HuellasCambiosModule {}
