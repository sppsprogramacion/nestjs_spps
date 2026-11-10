import { Module } from '@nestjs/common';
import { ParentescosMenoresPrincipalesService } from './parentescos_menores_principales.service';
import { ParentescosMenoresPrincipalesController } from './parentescos_menores_principales.controller';
import { ParentescoMenorPrincipal } from './entities/parentescos_menores_principale.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ParentescoMenorPrincipal
    ])
  ],
  controllers: [ParentescosMenoresPrincipalesController],
  providers: [ParentescosMenoresPrincipalesService]
})
export class ParentescosMenoresPrincipalesModule {}
