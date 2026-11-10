import { Module } from '@nestjs/common';
import { RequisitosVisitaService } from './requisitos-visita.service';
import { RequisitosVisitaController } from './requisitos-visita.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisitosVisita } from './entities/requisitos-visita.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      RequisitosVisita
    ])
  ],
  controllers: [RequisitosVisitaController],
  providers: [RequisitosVisitaService]
})
export class RequisitosVisitaModule {}
