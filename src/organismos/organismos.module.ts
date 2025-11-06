import { Module } from '@nestjs/common';
import { OrganismosService } from './organismos.service';
import { OrganismosController } from './organismos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organismo } from './entities/organismo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Organismo
    ])
  ],
  controllers: [OrganismosController],
  providers: [OrganismosService]
})
export class OrganismosModule {}
