import { Module } from '@nestjs/common';
import { TiposDefensorService } from './tipos-defensor.service';
import { TiposDefensorController } from './tipos-defensor.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDefensor } from './entities/tipos-defensor.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      TipoDefensor
    ])
  ],
  controllers: [TiposDefensorController],
  providers: [TiposDefensorService]
})
export class TiposDefensorModule {}
