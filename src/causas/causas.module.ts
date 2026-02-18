import { Module } from '@nestjs/common';
import { CausasService } from './causas.service';
import { CausasController } from './causas.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Causa } from './entities/causa.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Causa,
    ])
  ],
  controllers: [CausasController],
  providers: [CausasService]
})
export class CausasModule {}
