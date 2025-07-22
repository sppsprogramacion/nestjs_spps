import { Module } from '@nestjs/common';
import { NarizFormaService } from './nariz-forma.service';
import { NarizFormaController } from './nariz-forma.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NarizForma } from './entities/nariz-forma.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      NarizForma
    ])
  ],
  controllers: [NarizFormaController],
  providers: [NarizFormaService]
})
export class NarizFormaModule {}
