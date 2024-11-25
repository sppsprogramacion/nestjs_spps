import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { Brackets, IsNull, Repository } from 'typeorm';

@Injectable()
export class ProvinciasService {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>
  ){}

  async create(data: CreateProvinciaDto): Promise<Provincia> {

    try {
      
      const nuevo = await this.provinciaRepository.create(data);
      return await this.provinciaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.provinciaRepository.find(
      {
          order:{
              provincia: "ASC"
          }
      }
    );
  }

  //BUSCAR  XPAIS
  async findXPais(id_pais: string) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    if (id_pais == 'AR'){
      const provincias = await this.provinciaRepository.find(
        {        
          where: {
            pais_id: id_pais
          },
          order:{
            provincia: "ASC"
          }
        }
      );   
          
      return provincias;
    }

    if (id_pais != 'AR'){
      const provincias = await this.provinciaRepository.find(
        {        
          where: [
            {pais_id: id_pais},
            {pais_id: IsNull()}
          ],
          order:{
            provincia: "ASC"
          }
        }
      );   
          
      return provincias;

    }
  }
  //FIN BUSCAR  XPAIS..................................................................

  //BUSCAR  XID
  async findOne(id: string) {

    const respuesta = await this.provinciaRepository.findOneBy({id_provincia: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdateProvinciaDto) {

    try{
      const respuesta = await this.provinciaRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }

  async remove(id: string) {
    const respuesta = await this.provinciaRepository.findOneBy({id_provincia: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de provincia que intenta eliminar");
    return await this.provinciaRepository.remove(respuesta);
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
