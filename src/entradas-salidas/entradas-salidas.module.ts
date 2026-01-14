import { Module } from '@nestjs/common';
import { EntradasSalidasService } from './entradas-salidas.service';
import { EntradasSalidasController } from './entradas-salidas.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradasSalida } from './entities/entradas-salida.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      EntradasSalida
    ])
  ],
  controllers: [EntradasSalidasController],
  providers: [EntradasSalidasService]
})
export class EntradasSalidasModule {}
