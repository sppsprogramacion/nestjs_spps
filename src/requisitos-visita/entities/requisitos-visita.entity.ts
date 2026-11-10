import { Organismo } from "src/organismos/entities/organismo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('requisitos_entrada')
export class RequisitosVisita {
    @PrimaryGeneratedColumn()
    id_requisito_entrada: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    cant_adultos_principal: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    cant_adultos_secundarios: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    cant_menores_principal: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    cant_menores_secundarios: number;


    //ORGANISMO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    organismo_id: number;

    @ManyToOne(type => Organismo, {eager: true} )
    @JoinColumn({
        name: 'organismo_id',
        referencedColumnName: 'id_organismo'
    })
    organismo: Organismo;
    //FIN ORGANISMO


}
