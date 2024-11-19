import { Module } from '@nestjs/common';
import { OrganismosUsuarioService } from './organismos-usuario.service';
import { OrganismosUsuarioController } from './organismos-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganismoUsuario } from './entities/organismos-usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrganismoUsuario
    ])
  ],
  controllers: [OrganismosUsuarioController],
  providers: [OrganismosUsuarioService]
})
export class OrganismosUsuarioModule {}
