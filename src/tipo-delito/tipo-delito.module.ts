import { Module } from '@nestjs/common';
import { TipoDelitoService } from './tipo-delito.service';
import { TipoDelitoController } from './tipo-delito.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDelito } from './entities/tipo-delito.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      TipoDelito
    ])
  ],
  controllers: [TipoDelitoController],
  providers: [TipoDelitoService]
})
export class TipoDelitoModule {}
