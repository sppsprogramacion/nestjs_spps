import { Module } from '@nestjs/common';
import { TamanioService } from './tamanio.service';
import { TamanioController } from './tamanio.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tamanio } from './entities/tamanio.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Tamanio
    ])
  ],
  controllers: [TamanioController],
  providers: [TamanioService]
})
export class TamanioModule {}
