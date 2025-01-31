import { Module } from '@nestjs/common';
import { MotivosAtencionService } from './motivos_atencion.service';
import { MotivosAtencionController } from './motivos_atencion.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivoAtencion } from './entities/motivos_atencion.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      MotivoAtencion
    ])
  ],
  controllers: [MotivosAtencionController],
  providers: [MotivosAtencionService]
})
export class MotivosAtencionModule {}
