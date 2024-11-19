import { Module } from '@nestjs/common';
import { SistemasService } from './sistemas.service';
import { SistemasController } from './sistemas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sistema } from './entities/sistema.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sistema
    ])
  ],
  controllers: [SistemasController],
  providers: [SistemasService]
})
export class SistemasModule {}
