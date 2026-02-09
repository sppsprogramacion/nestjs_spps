import { Module } from '@nestjs/common';
import { PrisionReclusionService } from './prision-reclusion.service';
import { PrisionReclusionController } from './prision-reclusion.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrisionReclusion } from './entities/prision-reclusion.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      PrisionReclusion
    ])
  ],
  controllers: [PrisionReclusionController],
  providers: [PrisionReclusionService]
})
export class PrisionReclusionModule {}
