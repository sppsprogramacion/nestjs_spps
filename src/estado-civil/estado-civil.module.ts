import { Module } from '@nestjs/common';
import { EstadoCivilService } from './estado-civil.service';
import { EstadoCivilController } from './estado-civil.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCivil } from './entities/estado-civil.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      EstadoCivil
    ])
  ],
  controllers: [EstadoCivilController],
  providers: [EstadoCivilService]
})
export class EstadoCivilModule {}
