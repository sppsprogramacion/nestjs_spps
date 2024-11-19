import { Pais } from "src/paises/entities/pais.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('provincias')
export class Provincia {

    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_provincia: string;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    provincia: string

    //PAIS
    @Column({
        type: 'varchar',
        length: 10,
        nullable: true,
        default: null
    })
    pais_id: string;

    @ManyToOne(type => Pais, {eager: true} )
    @JoinColumn({
        name: 'pais_id',
        referencedColumnName: 'id_pais'
    })
    pais: Pais;
    //FIN PAIS
}
