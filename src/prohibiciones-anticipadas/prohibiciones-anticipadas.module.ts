import { Module } from '@nestjs/common';
import { ProhibicionesAnticipadasService } from './prohibiciones-anticipadas.service';
import { ProhibicionesAnticipadasController } from './prohibiciones-anticipadas.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProhibicionAnticipada } from './entities/prohibiciones-anticipada.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ProhibicionAnticipada,
      //BitacoraProhibicionVisita
    ])
  ],
  controllers: [ProhibicionesAnticipadasController],
  providers: [ProhibicionesAnticipadasService]
})
export class ProhibicionesAnticipadasModule {}
