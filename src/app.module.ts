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
import { NovedadesCiudadanoModule } from './novedades-ciudadano/novedades-ciudadano.module';
import { BitacoraCiudadanoModule } from './bitacora-ciudadano/bitacora-ciudadano.module';
import { DomiciliosCiudadanoModule } from './domicilios-ciudadano/domicilios-ciudadano.module';
import { TiposAtencionModule } from './tipos_atencion/tipos_atencion.module';
import { TiposAccesoModule } from './tipos_acceso/tipos_acceso.module';
import { OrganismosDestinoModule } from './organismos_destino/organismos_destino.module';
import { SectoresDestinoModule } from './sectores_destino/sectores_destino.module';
import { MotivosAtencionModule } from './motivos_atencion/motivos_atencion.module';
import { RegistroDiarioModule } from './registro-diario/registro-diario.module';
import { CategoriasCiudadanoModule } from './categorias-ciudadano/categorias-ciudadano.module';
import { CiudadanosCategoriasModule } from './ciudadanos-categorias/ciudadanos-categorias.module';
import { AbogadosInternoModule } from './abogados-interno/abogados-interno.module';
import { TiposDefensorModule } from './tipos-defensor/tipos-defensor.module';
import { DriveImagenesModule } from './drive-imagenes/drive-imagenes.module';
import { MenoresACargoModule } from './menores_a_cargo/menores_a_cargo.module';
import { ExcepcionesIngresoVisitaModule } from './excepciones-ingreso-visita/excepciones-ingreso-visita.module';
import { ProhibicionesAnticipadasModule } from './prohibiciones-anticipadas/prohibiciones-anticipadas.module';
import { BitacoraProhibicionesAnticipadasModule } from './bitacora-prohibiciones-anticipadas/bitacora-prohibiciones-anticipadas.module';
import { OjosColorModule } from './ojos_color/ojos_color.module';
import { TamanioModule } from './tamanio/tamanio.module';
import { NarizFormaModule } from './nariz-forma/nariz-forma.module';
import { PeloTipoModule } from './pelo-tipo/pelo-tipo.module';
import { PeloColorModule } from './pelo-color/pelo-color.module';
import { PielModule } from './piel/piel.module';
import { ParentescosMenoresModule } from './parentescos-menores/parentescos-menores.module';
import { ZonaResidenciaModule } from './zona-residencia/zona-residencia.module';
import { ListasGeneralesTablasModule } from './listas-generales-tablas/listas-generales-tablas.module';

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
    NovedadesCiudadanoModule,
    BitacoraCiudadanoModule,
    DomiciliosCiudadanoModule,
    TiposAtencionModule,
    TiposAccesoModule,
    OrganismosDestinoModule,
    SectoresDestinoModule,
    MotivosAtencionModule,
    RegistroDiarioModule,
    CategoriasCiudadanoModule,
    CiudadanosCategoriasModule,
    AbogadosInternoModule,
    TiposDefensorModule,
    DriveImagenesModule,
    MenoresACargoModule,
    ExcepcionesIngresoVisitaModule,
    ProhibicionesAnticipadasModule,
    BitacoraProhibicionesAnticipadasModule,
    OjosColorModule,
    TamanioModule,
    NarizFormaModule,
    PeloTipoModule,
    PeloColorModule,
    PielModule,
    ParentescosMenoresModule,
    ZonaResidenciaModule,
    ListasGeneralesTablasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
