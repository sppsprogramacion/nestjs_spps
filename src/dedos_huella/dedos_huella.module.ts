import { Module } from '@nestjs/common';
import { DedosHuellaService } from './dedos_huella.service';
import { DedosHuellaController } from './dedos_huella.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DedoHuella } from './entities/dedos_huella.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      DedoHuella
    ])
  ],
  controllers: [DedosHuellaController],
  providers: [DedosHuellaService]
})
export class DedosHuellaModule {}
