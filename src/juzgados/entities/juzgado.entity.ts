import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('juzgados')
export class Juzgado {
    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_juzgado: string;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  true
    })
    juzgado: string

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
        unique:  false
    })
    descripcion_organismo_oficial: string
}
