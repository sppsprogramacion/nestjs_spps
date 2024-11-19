import { Provincia } from "src/provincias/entities/provincia.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('departamentos')
export class Departamento {
    @PrimaryGeneratedColumn()
    id_departamento: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    departamento: string

    //PROVINCIA
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
    })
    provincia_id: string;

    @ManyToOne(type => Provincia, {eager: true} )
    @JoinColumn({
        name: 'provincia_id',
        referencedColumnName: 'id_provincia'
    })
    provincia: Provincia;
    //FIN PROVINCIA
}
