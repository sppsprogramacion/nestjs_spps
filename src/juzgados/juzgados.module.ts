import { Module } from '@nestjs/common';
import { JuzgadosService } from './juzgados.service';
import { JuzgadosController } from './juzgados.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      JuzgadosModule
    ])
  ],
  controllers: [JuzgadosController],
  providers: [JuzgadosService]
})
export class JuzgadosModule {}
