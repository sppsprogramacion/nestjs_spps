import { Module } from '@nestjs/common';
import { PeloTipoService } from './pelo-tipo.service';
import { PeloTipoController } from './pelo-tipo.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeloTipo } from './entities/pelo-tipo.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      PeloTipo
    ])
  ],
  controllers: [PeloTipoController],
  providers: [PeloTipoService]
})
export class PeloTipoModule {}
