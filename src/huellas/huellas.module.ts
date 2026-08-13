import { Module } from '@nestjs/common';
import { HuellasService } from './huellas.service';
import { HuellasController } from './huellas.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Huella } from './entities/huella.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Huella
    ])
  ],
  controllers: [HuellasController],
  providers: [HuellasService]
})
export class HuellasModule {}
