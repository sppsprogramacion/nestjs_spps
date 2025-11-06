import { Module } from '@nestjs/common';
import { EstadoProcesalService } from './estado-procesal.service';
import { EstadoProcesalController } from './estado-procesal.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoProcesal } from './entities/estado-procesal.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      EstadoProcesal
    ])
  ],
  controllers: [EstadoProcesalController],
  providers: [EstadoProcesalService]
})
export class EstadoProcesalModule {}
