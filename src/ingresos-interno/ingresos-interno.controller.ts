import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, InternalServerErrorException, NotFoundException, Put, UnprocessableEntityException } from '@nestjs/common';
import { IngresosInternoService } from './ingresos-interno.service';
import { CreateIngresosInternoDto } from './dto/create-ingresos-interno.dto';
import { UpdateIngresosInternoDto } from './dto/update-ingresos-interno.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ValidRoles } from 'src/auth/interfaces';
import { UpdateIngresoOtraUnidadDto } from './dto/update-ingreso-otra-unidad.dto';
import { EstablecerPeriodoObservacionDto } from './dto/establecer-periodo-observacion.dto';
import { CreateHistorialProcesalDto } from 'src/historial-procesal/dto/create-historial-procesal.dto';
import { EstablecerPeriodoTratamientoDto } from './dto/establecer-periodo-tratamiento.dto';
import { EstablecerPeriodoPruebaDto } from './dto/establecer-periodo-prueba.dto';
import { UpdateEgresoDto } from 'src/registro-diario/dto/update-egreso.dto';
import { UpdateEgresoInternoDto } from './dto/update-egreso-interno.dto';
import { EstablecerProgresividadDto } from './dto/establecer-progresividad.dto';
import { EstablecerConductaConceptoDto } from './dto/establecer-conducta-concepto.dto';
import { EstablecerAlojamientoDto } from './dto/establecer-alojamiento.dto';

@Controller('ingresos-interno')
export class IngresosInternoController {
  constructor(private readonly ingresosInternoService: IngresosInternoService) {}

  @Post()
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateIngresosInternoDto
  ) {
        
    return this.ingresosInternoService.create(data, user);
  }  
  
  @Get('todos')
  @Auth(ValidRoles.superadmin)
  findAll() {
    return this.ingresosInternoService.findAll();
  }

  //BUSCAR  XID INTERNO
  @Get('buscar-xinterno')  
  @Auth()
  async findXInterno(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_interno', ParseIntPipe) id_interno: string
    
  ) {    
    
    return this.ingresosInternoService.findXInterno(+id_interno);
  }
  //FIN BUSCAR  XID INTERNO....................................................

  //CONTAR POR ORGANISMO
  @Get('contaringresos-xorganismo')  
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  async contarIngresosXOrganismo(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    //@Query('id_interno', ParseIntPipe) id_interno: string
    
  ) {    
    
    return this.ingresosInternoService.contarIngresosPorEstadoProcesal(user.organismo_id);
  }
  //FINCONTAR POR ORGANISMO....................................................
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.ingresosInternoService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...............................

  @Put('ingresar-desde-otra-unidad')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  updateIngresarDesdeOtraUnidad(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ingreso', ParseIntPipe) id_ingreso: string ,
    @Body() dataDto: UpdateIngresoOtraUnidadDto
  ) {
    
    return this.ingresosInternoService.updateIngresarDesdeOtraUnidad(+id_ingreso, dataDto, user);
  }

  @Put('establecer-periodo-observacion')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  updateEstablecerPEriodoObservacion(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ingreso', ParseIntPipe) id_ingreso: string ,
    @Body() dataDto: EstablecerPeriodoObservacionDto
  ) {
    
    if(dataDto.progresividad_id != 4 ) throw new UnprocessableEntityException("La progresividad seleccionada debe ser OBSERVACION");
    
    let dataIngresoRequest: UpdateIngresosInternoDto = new UpdateIngresosInternoDto();
    let dataHistorialRequest: CreateHistorialProcesalDto = new CreateHistorialProcesalDto();
    dataIngresoRequest.progresividad_id = dataDto.progresividad_id;
    dataIngresoRequest.fase_id = 1;

    dataHistorialRequest.motivo = "PERIODO OBSERVACION";
    dataHistorialRequest.fecha = dataDto.fecha;
    dataHistorialRequest.detalle = dataDto.detalle;

    return this.ingresosInternoService.updateCargarProgresividad(+id_ingreso, dataIngresoRequest, dataHistorialRequest, user);
  }

  @Put('establecer-periodo-tratamiento')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  updateEstablecerPeriodoTratamiento(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ingreso', ParseIntPipe) id_ingreso: string ,
    @Body() dataDto: EstablecerPeriodoTratamientoDto
  ) {
    
    if(dataDto.progresividad_id != 6 ) throw new UnprocessableEntityException("La progresividad seleccionada debe ser TRATAMIENTO");
    
    if(dataDto.fase_id != 4 && dataDto.tiene_extramuro == true){
      throw new UnprocessableEntityException("Solo la fase de confianza puede tener extramuro");
    }

    let dataIngresoRequest: UpdateIngresosInternoDto = new UpdateIngresosInternoDto();
    let dataHistorialRequest: CreateHistorialProcesalDto = new CreateHistorialProcesalDto();
    dataIngresoRequest.progresividad_id = dataDto.progresividad_id;
    dataIngresoRequest.fase_id = dataDto.fase_id;
    dataIngresoRequest.tiene_extramuro = dataDto.tiene_extramuro;
    
    if(dataDto.fase_id == 2){
      
      dataHistorialRequest.motivo = "PERIODO TRATAMIENTO - SOCIALIZACION";
    }
    if(dataDto.fase_id == 3){
      
      dataHistorialRequest.motivo = "PERIODO TRATAMIENTO - CONSOLIDACION";
    }
    if(dataDto.fase_id == 4){
      
      dataHistorialRequest.motivo = "PERIODO TRATAMIENTO - CONFIANZA";
    }
    dataHistorialRequest.fecha = dataDto.fecha;
    dataHistorialRequest.detalle = dataDto.detalle;

    return this.ingresosInternoService.updateCargarProgresividad(+id_ingreso, dataIngresoRequest, dataHistorialRequest, user);
  }

  //ESTABLECER ALOJAMIENTO
  @Put('establecer-alojamiento')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  updateEstablecerAlojamiento(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ingreso', ParseIntPipe) id_ingreso: string ,
    @Body() dataDto: EstablecerAlojamientoDto
  ) {
        
    let dataIngresoRequest: UpdateIngresosInternoDto = new UpdateIngresosInternoDto();
    let dataHistorialRequest: CreateHistorialProcesalDto = new CreateHistorialProcesalDto();
    
    dataIngresoRequest.pabellon_id = dataDto.pabellon_id;
    dataIngresoRequest.celda = dataDto.celda;
    dataIngresoRequest.tiene_programa_puerta = dataDto.tiene_programa_puerta;
    dataIngresoRequest.situacion_provisoria_id = dataDto.situacion_provisoria_id;
   
    dataHistorialRequest.fecha = dataDto.fecha;
    dataHistorialRequest.detalle = dataDto.detalle;

    return this.ingresosInternoService.updateCargarAlojamiento(+id_ingreso, dataIngresoRequest, dataHistorialRequest, user);
  }
  //FIN ESTABLECER ALOJAMIENTO

  //ESTABLECER CONDUCTA CONCEPTO
  @Put('establecer-conducta-concepto')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  updateEstablecerConductaConcepto(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ingreso', ParseIntPipe) id_ingreso: string ,
    @Body() dataDto: EstablecerConductaConceptoDto
  ) {
           
    return this.ingresosInternoService.update(+id_ingreso, dataDto,user);
  }
  //FIN ESTABLECER CONDUCTA CONCEPTO

  //ESTABLECER PROGRESIVIDAD
  @Put('establecer-progresividad')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  updateEstablecerProgresividad(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ingreso', ParseIntPipe) id_ingreso: string ,
    @Body() dataDto: EstablecerProgresividadDto
  ) {
        
    let dataIngresoRequest: UpdateIngresosInternoDto = new UpdateIngresosInternoDto();
    let dataHistorialRequest: CreateHistorialProcesalDto = new CreateHistorialProcesalDto();
    
    dataIngresoRequest.progresividad_id = dataDto.progresividad_id;
    dataIngresoRequest.fase_id = dataDto.fase_id;
    dataIngresoRequest.tiene_extramuro = dataDto.tiene_extramuro;
    dataIngresoRequest.tiene_granja = dataDto.tiene_granja;
    dataIngresoRequest.tiene_semilibertad = dataDto.tiene_semilibertad;
    dataIngresoRequest.tiene_transitoria = dataDto.tiene_transitoria;
   
    dataHistorialRequest.fecha = dataDto.fecha;
    dataHistorialRequest.detalle = dataDto.detalle;

    return this.ingresosInternoService.updateCargarProgresividad(+id_ingreso, dataIngresoRequest, dataHistorialRequest, user);
  }
  //FIN ESTABLECER PROGRESIVIDAD

  //ESTABLECER PERIODO DE PRUEBA
  @Put('establecer-periodo-prueba')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  updateEstablecerPeriodoPrueba(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ingreso', ParseIntPipe) id_ingreso: string ,
    @Body() dataDto: EstablecerPeriodoPruebaDto
  ) {
    
    if(dataDto.progresividad_id != 5) throw new UnprocessableEntityException("La progresividad seleccionada debe ser PRUEBA");
    
    let dataIngresoRequest: UpdateIngresosInternoDto = new UpdateIngresosInternoDto();
    let dataHistorialRequest: CreateHistorialProcesalDto = new CreateHistorialProcesalDto();
    dataIngresoRequest.progresividad_id = dataDto.progresividad_id;
    dataIngresoRequest.fase_id = 1;
    dataIngresoRequest.tiene_extramuro = false;

    dataHistorialRequest.motivo = "PERIODO PRUEBA";    
    dataHistorialRequest.fecha = dataDto.fecha;
    dataHistorialRequest.detalle = dataDto.detalle;

    return this.ingresosInternoService.updateCargarProgresividad(+id_ingreso, dataIngresoRequest, dataHistorialRequest, user);
  }
  //FIN ESTABLECER PERIODO DE PRUEBA...........................................................

  //ESTABLECER EGRESO
  @Put('egreso')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  updateEgreso(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ingreso', ParseIntPipe) id_ingreso: string ,
    @Body() dataDto: UpdateEgresoInternoDto
  ) {
    
    
    //let dataIngresoRequest: UpdateIngresosInternoDto = new UpdateIngresosInternoDto();
    let dataHistorialRequest: CreateHistorialProcesalDto = new CreateHistorialProcesalDto();
    
    dataDto.esta_liberado = true;
    
    dataHistorialRequest.motivo = "EGRESO";    
    dataHistorialRequest.fecha = dataDto.fecha_egreso;
    dataHistorialRequest.detalle = dataDto.detalles_egreso;

    return this.ingresosInternoService.updateEgreso(+id_ingreso, dataDto, dataHistorialRequest, user);
  }
  //FIN ESTABLECER EGRESO...........................................................
  
  @Put(':id')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  update(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateIngresosInternoDto
  ) {
    
    return this.ingresosInternoService.update(+id, dataDto, user);
  }
}
