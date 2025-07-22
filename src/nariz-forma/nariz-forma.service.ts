import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNarizFormaDto } from './dto/create-nariz-forma.dto';
import { UpdateNarizFormaDto } from './dto/update-nariz-forma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NarizForma } from './entities/nariz-forma.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NarizFormaService {
  
  constructor(
    @InjectRepository(NarizForma)
    private readonly narizFormaRepository: Repository<NarizForma>
  ){}

  async create(data: CreateNarizFormaDto): Promise<NarizForma> {

    try {
      
      const nuevo = await this.narizFormaRepository.create(data);
      await this.narizFormaRepository.insert(nuevo);
      return nuevo;

    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.narizFormaRepository.find(
      {
          order:{
              nariz_forma: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: string) {

    const respuesta = await this.narizFormaRepository.findOneBy({id_nariz_forma: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdateNarizFormaDto) {

    try{
      const respuesta = await this.narizFormaRepository.update(id, data);
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
