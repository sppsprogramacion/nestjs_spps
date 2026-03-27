import { Module } from '@nestjs/common';
import { ReligionesService } from './religiones.service';
import { ReligionesController } from './religiones.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Religion } from './entities/religione.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Religion
    ])
  ],
  controllers: [ReligionesController],
  providers: [ReligionesService]
})
export class ReligionesModule {}
