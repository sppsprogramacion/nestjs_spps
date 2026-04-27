import { Module } from '@nestjs/common';
import { FasesService } from './fases.service';
import { FasesController } from './fases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fase } from './entities/fase.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Fase
    ])
  ],
  controllers: [FasesController],
  providers: [FasesService]
})
export class FasesModule {}
