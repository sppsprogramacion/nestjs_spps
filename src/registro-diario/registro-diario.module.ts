import { Module } from '@nestjs/common';
import { RegistroDiarioService } from './registro-diario.service';
import { RegistroDiarioController } from './registro-diario.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroDiario } from './entities/registro-diario.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      RegistroDiario
    ])
  ],
  controllers: [RegistroDiarioController],
  providers: [RegistroDiarioService]
})
export class RegistroDiarioModule {}
