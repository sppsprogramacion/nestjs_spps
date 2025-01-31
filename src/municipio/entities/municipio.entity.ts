import { Departamento } from "src/departamentos/entities/departamento.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('municipios')
export class Municipio {

    @PrimaryGeneratedColumn()
    id_municipio: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  false
    })
    municipio: string

    //DEPARTAMENTO
    @Column({
        type: 'int',
        nullable: false
    })
    departamento_id: number;

    @ManyToOne(type => Departamento, {eager: true} )
    @JoinColumn({
        name: 'departamento_id',
        referencedColumnName: 'id_departamento'
    })
    departamento: Departamento;
    //FIN DEPARTAMENTO
    
}
