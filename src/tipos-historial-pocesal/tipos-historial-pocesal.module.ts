import { Module } from '@nestjs/common';
import { TiposHistorialPocesalService } from './tipos-historial-pocesal.service';
import { TiposHistorialPocesalController } from './tipos-historial-pocesal.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoHistorialPocesal } from './entities/tipos-historial-pocesal.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      TipoHistorialPocesal
    ])
  ],
  controllers: [TiposHistorialPocesalController],
  providers: [TiposHistorialPocesalService]
})
export class TiposHistorialPocesalModule {}
