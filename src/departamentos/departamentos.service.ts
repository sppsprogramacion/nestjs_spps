import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>
  ){}

  async create(data: CreateDepartamentoDto): Promise<Departamento> {

    try {
      
      const nuevo = await this.departamentoRepository.create(data);
      return await this.departamentoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.departamentoRepository.find(
      {
          order:{
              departamento: "ASC"
          }
      }
    );
  }

  //BUSCAR  XPROVINCIA
  async findXProvincia(id_provincia: string) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const departamentos = await this.departamentoRepository.find(
        {        
          where: {
            provincia_id: id_provincia
          },
          order:{
            departamento: "ASC"
          }
        }
      );   
          
      return departamentos;
    
  }
  //FIN BUSCAR  XPROVINCIA..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.departamentoRepository.findOneBy({id_departamento: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateDepartamentoDto) {

    try{
      const respuesta = await this.departamentoRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }

  async remove(id: number) {
    const respuesta = await this.departamentoRepository.findOneBy({id_departamento: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de estado_civil que intenta eliminar");
    return await this.departamentoRepository.remove(respuesta);
  }


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
