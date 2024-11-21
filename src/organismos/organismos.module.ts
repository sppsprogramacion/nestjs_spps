import { Module } from '@nestjs/common';
import { OrganismosService } from './organismos.service';
import { OrganismosController } from './organismos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organismo } from './entities/organismo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organismo
    ])
  ],
  controllers: [OrganismosController],
  providers: [OrganismosService]
})
export class OrganismosModule {}
