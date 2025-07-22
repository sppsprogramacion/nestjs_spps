import { Module } from '@nestjs/common';
import { PeloColorService } from './pelo-color.service';
import { PeloColorController } from './pelo-color.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeloColor } from './entities/pelo-color.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      PeloColor
    ])
  ],
  controllers: [PeloColorController],
  providers: [PeloColorService]
})
export class PeloColorModule {}
