import { Module } from '@nestjs/common';
import { AbogadosInternoService } from './abogados-interno.service';
import { AbogadosInternoController } from './abogados-interno.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbogadoInterno } from './entities/abogados-interno.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      AbogadoInterno
    ])
  ],
  controllers: [AbogadosInternoController],
  providers: [AbogadosInternoService]
})
export class AbogadosInternoModule {}
