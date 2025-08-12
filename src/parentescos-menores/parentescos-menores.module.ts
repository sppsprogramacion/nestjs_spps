import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { ParentescoMenor } from './entities/parentescos-menor.entity';
import { ParentescosMenoresService } from './parentescos-menores.service';
import { ParentescosMenoresController } from './parentescos-menores.controller';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ParentescoMenor
    ])
  ],
  controllers: [ParentescosMenoresController],
  providers: [ParentescosMenoresService]
})
export class ParentescosMenoresModule {}
