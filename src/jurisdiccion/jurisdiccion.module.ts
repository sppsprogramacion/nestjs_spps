import { Module } from '@nestjs/common';
import { JurisdiccionService } from './jurisdiccion.service';
import { JurisdiccionController } from './jurisdiccion.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Jurisdiccion } from './entities/jurisdiccion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Jurisdiccion
    ])
  ],
  controllers: [JurisdiccionController],
  providers: [JurisdiccionService]
})
export class JurisdiccionModule {}
