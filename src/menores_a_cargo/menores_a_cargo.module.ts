import { Module } from '@nestjs/common';
import { MenoresACargoService } from './menores_a_cargo.service';
import { MenoresACargoController } from './menores_a_cargo.controller';
import { MenorACargo } from './entities/menores_a_cargo.entity';
import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      MenorACargo,
      Ciudadano,
    ])
  ],
  controllers: [MenoresACargoController],
  providers: [MenoresACargoService]
})
export class MenoresACargoModule {}
