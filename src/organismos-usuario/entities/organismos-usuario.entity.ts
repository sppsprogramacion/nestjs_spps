import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('organismos_usuario')
export class OrganismoUsuario {

    @PrimaryGeneratedColumn()
    id_organismo_usuario: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  false
    })
    organismo_usuario: string

   
}
