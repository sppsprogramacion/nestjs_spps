import { forwardRef, Module } from '@nestjs/common';
import { DomiciliosInternoService } from './domicilios-interno.service';
import { DomiciliosInternoController } from './domicilios-interno.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomicilioInterno } from './entities/domicilios-interno.entity';
import { IngresosInternoModule } from 'src/ingresos-interno/ingresos-interno.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => IngresosInternoModule),
    TypeOrmModule.forFeature([
      DomicilioInterno
    ])
  ],
  controllers: [DomiciliosInternoController],
  providers: [DomiciliosInternoService]
})
export class DomiciliosInternoModule {}
