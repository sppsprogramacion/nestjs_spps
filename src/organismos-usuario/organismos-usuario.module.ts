import { Module } from '@nestjs/common';
import { OrganismosUsuarioService } from './organismos-usuario.service';
import { OrganismosUsuarioController } from './organismos-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganismoUsuario } from './entities/organismos-usuario.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      OrganismoUsuario
    ])
  ],
  controllers: [OrganismosUsuarioController],
  providers: [OrganismosUsuarioService]
})
export class OrganismosUsuarioModule {}
