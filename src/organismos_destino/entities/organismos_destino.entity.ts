import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('organismos_destino')
export class OrganismoDestino {

    @PrimaryGeneratedColumn()
    id_organismo_destino: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  false
    })
    organismo_destino: string

    @Column({
        type: 'int',
        nullable: false
    })
    organismo_depende: number;
    
}
