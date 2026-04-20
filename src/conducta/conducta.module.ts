import { Module } from '@nestjs/common';
import { ConductaService } from './conducta.service';
import { ConductaController } from './conducta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conducta } from './entities/conducta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Conducta
    ])
  ],
  controllers: [ConductaController],
  providers: [ConductaService]
})
export class ConductaModule {}
