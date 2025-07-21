import { Module } from '@nestjs/common';
import { OjosColorService } from './ojos_color.service';
import { OjosColorController } from './ojos_color.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OjosColor } from './entities/ojos_color.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      OjosColor
    ])
  ],
  controllers: [OjosColorController],
  providers: [OjosColorService]
})
export class OjosColorModule {}
