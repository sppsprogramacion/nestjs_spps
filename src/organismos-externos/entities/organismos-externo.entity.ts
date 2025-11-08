import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('organismos_externos')
export class OrganismoExterno {

    @PrimaryGeneratedColumn()
    id_organismo_externo: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  true
    })
    organismo_externo: string
    
}
