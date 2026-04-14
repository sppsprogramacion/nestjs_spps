import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePabelloneDto } from './dto/create-pabellone.dto';
import { UpdatePabelloneDto } from './dto/update-pabellone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pabellon } from './entities/pabellone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PabellonesService {
  
  constructor(
    @InjectRepository(Pabellon)
    private readonly pabellonRepository: Repository<Pabellon>
  ){}

  async create(data: CreatePabelloneDto): Promise<Pabellon> {

    try {
      
      const nuevo = await this.pabellonRepository.create(data);
      return await this.pabellonRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.pabellonRepository.find(
      {
          order:{
              pabellon: "ASC"
          }
      }
    );
  }

  //BUSCAR  XDEPARTAMENTO
  async findXOrganismo(id_organismo: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const pabellones = await this.pabellonRepository.find(
        {        
          where: {
            organismo_id: id_organismo,
            activo : true
          },
          order:{
            pabellon: "ASC"
          }
        }
      );   
          
      return pabellones;
    
  }
  //FIN BUSCAR  XDEPARTAMENTO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.pabellonRepository.findOneBy({id_pabellon: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdatePabelloneDto) {

    try{
      const respuesta = await this.pabellonRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
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
