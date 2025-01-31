import { Module } from '@nestjs/common';
import { OrganismosDestinoService } from './organismos_destino.service';
import { OrganismosDestinoController } from './organismos_destino.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganismoDestino } from './entities/organismos_destino.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      OrganismoDestino
    ])
  ],
  controllers: [OrganismosDestinoController],
  providers: [OrganismosDestinoService]
})
export class OrganismosDestinoModule {}
