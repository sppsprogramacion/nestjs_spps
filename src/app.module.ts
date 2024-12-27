import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CiudadanosModule } from './ciudadanos/ciudadanos.module';
import { SexoModule } from './sexo/sexo.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolesModule } from './roles/roles.module';
import { EstadoCivilModule } from './estado-civil/estado-civil.module';
import { PaisesModule } from './paises/paises.module';
import { ProvinciasModule } from './provincias/provincias.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { MunicipioModule } from './municipio/municipio.module';
import { NacionalidadesModule } from './nacionalidades/nacionalidades.module';
import { SistemasModule } from './sistemas/sistemas.module';
import { OrganismosUsuarioModule } from './organismos-usuario/organismos-usuario.module';
import { OrganismosModule } from './organismos/organismos.module';
import { ProhibicionesVisitaModule } from './prohibiciones-visita/prohibiciones-visita.module';
import { BitacoraProhibicionesVisitaModule } from './bitacora-prohibiciones-visita/bitacora-prohibiciones-visita.module';
import { InternosModule } from './internos/internos.module';
import { VisitasInternosModule } from './visitas-internos/visitas-internos.module';
import { ParentescosModule } from './parentescos/parentescos.module';
import { UsuariosRolModule } from './usuarios-rol/usuarios-rol.module';

@Module({
  imports: [
    //Para reconocer variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    //accede a la configuracion de ConfigService en el archivo env.config.ts en la carpeta config 
    //para usar las variables de entorno usando typeOrmConfigAsync
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    
    AuthModule,
    CiudadanosModule, 
    SexoModule,
    UsuarioModule,
    RolesModule,
    EstadoCivilModule,
    PaisesModule,
    ProvinciasModule,
    DepartamentosModule,
    MunicipioModule,
    NacionalidadesModule,
    SistemasModule,
    OrganismosUsuarioModule,
    OrganismosModule,
    ProhibicionesVisitaModule,
    BitacoraProhibicionesVisitaModule,
    InternosModule,
    VisitasInternosModule,
    ParentescosModule,
    UsuariosRolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
