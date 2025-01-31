import { Module } from '@nestjs/common';
import { TiposAtencionService } from './tipos_atencion.service';
import { TiposAtencionController } from './tipos_atencion.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAtencion } from './entities/tipos_atencion.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      TipoAtencion
    ])
  ],
  controllers: [TiposAtencionController],
  providers: [TiposAtencionService]
})
export class TiposAtencionModule {}
