import { Module } from '@nestjs/common';
import { PielService } from './piel.service';
import { PielController } from './piel.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piel } from './entities/piel.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Piel
    ])
  ],
  controllers: [PielController],
  providers: [PielService]
})
export class PielModule {}
