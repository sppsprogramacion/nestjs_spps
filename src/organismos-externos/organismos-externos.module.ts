import { Module } from '@nestjs/common';
import { OrganismosExternosService } from './organismos-externos.service';
import { OrganismosExternosController } from './organismos-externos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganismoExterno } from './entities/organismos-externo.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      OrganismoExterno
    ])
  ],
  controllers: [OrganismosExternosController],
  providers: [OrganismosExternosService]
})
export class OrganismosExternosModule {}
