import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estado_procesal')
export class EstadoProcesal {

    @PrimaryGeneratedColumn()
    id_estado_procesal: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  false
    })
    estado_procesal: string
}
