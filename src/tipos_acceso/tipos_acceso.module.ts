import { Module } from '@nestjs/common';
import { TiposAccesoService } from './tipos_acceso.service';
import { TiposAccesoController } from './tipos_acceso.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAcceso } from './entities/tipos_acceso.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      TipoAcceso
    ])
  ],
  controllers: [TiposAccesoController],
  providers: [TiposAccesoService]
})
export class TiposAccesoModule {}
