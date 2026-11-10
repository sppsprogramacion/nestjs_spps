import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateParentescosMenoresPrincipaleDto } from './dto/create-parentescos_menores_principale.dto';
import { UpdateParentescosMenoresPrincipaleDto } from './dto/update-parentescos_menores_principale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentescoMenorPrincipal } from './entities/parentescos_menores_principale.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Organismo } from 'src/organismos/entities/organismo.entity';

@Injectable()
export class ParentescosMenoresPrincipalesService {
  
  constructor(
    @InjectRepository(ParentescoMenorPrincipal)
    private readonly parentescoMenorPrincipalRepository: Repository<ParentescoMenorPrincipal>
  ){}

  async create(data: CreateParentescosMenoresPrincipaleDto, usuario: Usuario): Promise<ParentescoMenorPrincipal> {

    let fecha_actual: any = new Date().toISOString().split('T')[0];
    data.organismo_id = usuario.organismo_id;
    data.fecha_alta = fecha_actual;
    data.detalles = "USUARIO ALTA: " + usuario.apellido + " " + usuario.nombre + " - dni: " + usuario.dni + " //";

    try {
      
      const nuevo = await this.parentescoMenorPrincipalRepository.create(data);
      return await this.parentescoMenorPrincipalRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findListaXOrganismo(usuario: Usuario) {
    return await this.parentescoMenorPrincipalRepository.find(
      {
        where: {
          organismo_id: usuario.organismo_id,
          vigente: true
        },
        
        order:{
          parentesco_id: "ASC"
        }        
      }
    );
  }

  async findAll() {
    return await this.parentescoMenorPrincipalRepository.find(
      {
        where: {
          vigente: true
        },
        order:{
          parentesco_id: "ASC"
        }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.parentescoMenorPrincipalRepository.findOneBy({id_parentesco_menor_principal: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //QUITAR PARENTESCO
  async updateQuitarParentesco(id: number, usuario: Usuario) {

    let fecha_actual: any = new Date().toISOString().split('T')[0];
    let dataModificar: UpdateParentescosMenoresPrincipaleDto = new UpdateParentescosMenoresPrincipaleDto;
    
    dataModificar.fecha_baja = fecha_actual;
    dataModificar.detalles = dataModificar + "// USUARIO BAJA: " + usuario.apellido + " " + usuario.nombre + " - dni: " + usuario.dni;

    try{
      const respuesta = await this.parentescoMenorPrincipalRepository.update(id, dataModificar);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }
  //ACTUALIZAR CANTIDADES

  //MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }
    
    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
  }
  //FIN MANEJO DE ERRORES........................................
}
